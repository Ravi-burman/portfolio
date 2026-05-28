import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LenisScroll from "@/components/LenisScroll";

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ravi Burman | Senior Software Engineer Portfolio",
  description:
    "Explore the interactive 3D Deep Space portfolio of Ravi Burman, Senior Software Engineer based in Pune, India. Architecting scalable, high-performance web systems.",
  keywords: [
    "Ravi Burman",
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Three.js Portfolio",
    "React.js",
    "Angular",
    "TypeScript",
    "Node.js",
    "Golang",
  ],
  authors: [{ name: "Ravi Burman" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoSlab.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-md-background text-md-on-surface">
        {/* Custom cursor trail overlay */}
        <CustomCursor />
        {/* Momentum inertial scroll */}
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
