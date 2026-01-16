import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Della Fleur",
  description: "A modern florist web app featuring Whatsapp-based checkout",
  openGraph: {
    title: "Della Fleur",
    description: "Beautiful custom bouquets for every moment 💐",
    url: "https://della-fleur.vercel.app",
    siteName: "Della Fleur",
    images: [
      {
        url: "https://della-fleur.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Della Fleur",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}

        {/* Daum Postcode Script */}
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
