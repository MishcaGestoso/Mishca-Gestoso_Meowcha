import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const wonderbar = localfont({
  src: [
    {
      path: "../public/fonts/Wonderbar Demo.otf",
      weight: "400",
    },
  ],
  variable: "--font-wonderbar",
});

export const metadata: Metadata = {
  title: "Meowcha",
  description: "SWEEEEETTT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={wonderbar.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
