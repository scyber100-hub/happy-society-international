import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Society International",
  description: "A global progressive movement for a society where everyone lives with dignity",
  metadataBase: new URL('https://happy-society.org'),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Happy Society International',
    description: 'A global progressive movement for a society where everyone lives with dignity',
    url: 'https://happy-society.org',
    siteName: 'Happy Society International',
    images: [
      {
        url: '/og-image-v2.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Happy Society International',
      },
    ],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Society International',
    description: 'A global progressive movement for a society where everyone lives with dignity',
    images: ['/og-image-v2.png?v=2'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
