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
