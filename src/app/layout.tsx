import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import SessionWrapper from "@/provider/SessionWrapper";
import SidebarWrapper from "@/components/sidebarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Asad Qureshi's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          {/* <SidebarProvider className=" bg-black">
            <SidebarWrapper /> */}
          <main className=" w-full">
            {/* <SidebarTrigger
                className=" text-white rounded-none"
                id="sidebar"
              /> */}
            {children}
            <Toaster />
          </main>
          {/* </SidebarProvider> */}
        </SessionWrapper>
      </body>
    </html>
  );
}
