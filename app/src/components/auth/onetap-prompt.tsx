'use client';
import { authClient } from '@/lib/client/auth/auth';

export const OneTapPrompt = () => {
  authClient.oneTap();
  return null;
};
