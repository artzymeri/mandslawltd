import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "M&S Law LTD | Solicitors in Blackburn, Lancashire",
  description: "M&S Law is based in Blackburn with expert solicitors offering Wills & Trusts, Personal Injury, Housing Disrepair, and Work Related Illness legal services. Contact us on 01254 40 40 55.",
  keywords: "solicitors, law firm, Blackburn, Lancashire, wills, trusts, personal injury, housing disrepair, work related illness",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "M&S Law LTD | Solicitors in Blackburn, Lancashire",
    description: "Expert solicitors offering Wills & Trusts, Personal Injury, Housing Disrepair, and Work Related Illness legal services.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
