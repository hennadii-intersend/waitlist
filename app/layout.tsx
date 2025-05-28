import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"], // Corrected from 'weights' to 'weight'
  variable: "--font-inter", // Optional: if you want to use it as a CSS variable
});

export const metadata: Metadata = {
  title: "Interspace - Join the waitlist",
  description: "Waitlist page for Intersend mobile-first crypto wallet.",
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any', rel: 'icon' },
      { url: '/images/favicon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/images/favicon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  openGraph: {
    title: "Interspace - Join the waitlist",
    description: "Waitlist page for Intersend mobile-first crypto wallet.",
    url: "/", 
    siteName: "Interspace",
    images: [
      {
        url: '/images/interspace-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Interspace Waitlist Promotion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Interspace - Join the waitlist",
    description: "Waitlist page for Intersend mobile-first crypto wallet.",
    site: '@interspace_fi',
    images: ['/images/interspace-og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
