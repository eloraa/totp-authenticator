import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import { getTheme } from '@/lib/server/theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Authenticator',
  description: 'TOTP Authenticator',
};

export async function generateViewport(): Promise<Viewport> {
  const cookieStore = await cookies();
  const { theme } = getTheme({ cookies: cookieStore });
  const color = theme === 'dark' ? '#000' : '#fff';
  return {
    themeColor: color,
    colorScheme: theme,
    interactiveWidget: 'resizes-content',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <div style={{ display: 'contents' }}>{children}</div>
      </body>
    </html>
  );
}
