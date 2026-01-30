import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Deepanshu Sharma | Mobile Developer",
  description: "Flutter & Android Developer Portfolio - Building beautiful, performant mobile applications",
  keywords: ["Flutter", "Android", "Mobile Developer", "Kotlin", "Dart", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
