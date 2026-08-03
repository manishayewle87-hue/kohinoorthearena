import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mahalaxmi The ARENA | 2, 3 & 4 BHK Sports Township in Pimpri, Pune",
  description: "Discover Mahalaxmi The ARENA in Pimpri, Pune — an ultra-modern 2, 3 & 4 BHK residential sports township featuring an 80,000 sq. ft. sports operating system managed by ILESEUM Sports Management across 11 luxury 34-storey towers.",
  keywords: "Mahalaxmi The Arena, Arena Pimpri, Sports Township Pune, 2 BHK Pimpri, 3 BHK Pimpri, 4 BHK Pimpri, Kohinoor Group, Agarwal Sukhwani Associates, Ileseum Sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230D0818'/><text x='50%25' y='55%25' dominant-baseline='central' text-anchor='middle' font-size='50'>🏃</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
