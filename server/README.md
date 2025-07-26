# Authinticator Server API Documentation

## Authentication
All endpoints except `/health` require a valid session token in a cookie. The cookie key can be either `better-auth.session_token` or `session_token`. The value must be a signed token in the format `<token>.<signature>`, verified using HMAC-SHA256 and a server-side secret. The token is then checked against the `session` table in Postgres.

---

## Endpoints

### GET /health
- **Description:** Check server status.
- **Auth:** None
- **Response:**
  - `200 OK` with body `OK`

### GET /list
- **Description:** List all added authentication services.
- **Auth:** Required (session cookie)
- **Response:**
  - `200 OK` JSON array of services:
    ```json
    [
      { "name": "Service Name", "key": "setup key" },
      ...
    ]
    ```

### POST /add
- **Description:** Add a new authentication service.
- **Auth:** Required (session cookie)
- **Request Body:**
  - JSON object:
    ```json
    {
      "name": "Service Name",
      "key": "setup key or QR code data"
    }
    ```
- **Response:**
  - `201 Created` with body `Added` on success
  - `400 Bad Request` if missing fields or invalid JSON

### WebSocket /ws
- **Description:** Real-time TOTP code updates for all added services.
- **Auth:** Required (session cookie)
- **Protocol:** WebSocket
- **Response:**
  - Every second, sends a JSON array:
    ```json
    [
      { "name": "Service Name", "code": "123456" },
      ...
    ]
    ```

### GET /code
- **Description:** Get current TOTP codes for the authenticated user. Supports optional filtering by service `id` or `name`.
- **Auth:** Required (session cookie)
- **Query Parameters:**
  - `id` (optional): Filter by service ID
  - `name` (optional): Filter by service name
  - If neither is provided, returns codes for all of the user's services.
- **Response:**
  - `200 OK` JSON array of codes:
    ```json
    [
      {
        "id": "service-id-1",
        "name": "Service Name",
        "code": "123456",
        "expires_at": "2025-07-24T12:34:56Z"
      },
      ...
    ]
    ```

### DELETE /delete
- **Description:** Delete an authentication service by its `id` for the current user.
- **Auth:** Required (session cookie)
- **Query Parameters:**
  - `id` (required): The service ID to delete
- **Response:**
  - `200 OK` with body `{ "message": "Deleted" }` on success
  - `400 Bad Request` if missing id
  - `404 Not Found` if the service does not exist or does not belong to the user
  - `500 Internal Server Error` on DB error

---


## Notes
- The `/list`, `/add`, and `/ws` endpoints require a valid session token as described above.
- The service list is in-memory and not persisted.
- TOTP codes are generated using the provided setup key for each service. 