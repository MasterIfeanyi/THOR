import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from './_components/SessionProvider'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "THOR",
  description: "The world class open-source contribution guide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
