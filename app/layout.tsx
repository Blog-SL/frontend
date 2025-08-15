import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "BlogVerse",
  description: "Microservices-powered blog platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-neutral-200">
        {/* Background image with dimming */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-50"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        ></div>

        {/* All content goes here */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Providers>
            {/* Sticky Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 container mx-auto px-4 py-10">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-800 py-6 text-center text-white">
              © {new Date().getFullYear()} BlogVerse. All rights reserved.
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
}
