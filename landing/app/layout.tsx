import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Set your metadataBase so that social image URLs resolve correctly:
  metadataBase: new URL('https://sparkshift.app'),
  title: 'Spark Shift - The Ultimate Electrical Trade App',
  description:
    'Connect, organize, and electrify your electrical apprenticeship journey with Spark Shift. Track hours, submit evaluations, and advance your career.',
  keywords: [
    'electrical apprenticeship',
    'journeyman app',
    'hour tracking',
    'evaluations',
    'electrical trade'
  ],
  openGraph: {
    title: 'Spark Shift - The Ultimate Electrical Trade App',
    description: 'Connect, organize, and electrify your electrical apprenticeship journey',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
