import type { Metadata } from "next";
import "./globals.css";
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})




export const metadata: Metadata = {
  title: "Concal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.className}>
      <body
      >
        {children}
      </body>
    </html>
  );
}
