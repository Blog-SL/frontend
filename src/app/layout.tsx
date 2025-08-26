import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AppProvider } from "@/context/AppContext";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "BlogSL",
  description: "Your Literary Sanctuary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-16"> 
        <AppProvider>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
