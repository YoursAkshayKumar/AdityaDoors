import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppChatWidget from "@/components/whatsapp-chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Windazo - Modern Window Blinds and Shutters",
  description: "Quality window blinds and shutters for your home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppChatWidget />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
