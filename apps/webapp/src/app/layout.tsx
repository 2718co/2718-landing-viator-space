"use client";

import localFont from "@next/font/local";
import type { PropsWithChildren } from "react";

import { ClientProvider } from "../client/trpc";
import WagmiProvider from "../client/wagmi";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const customFont = localFont({
  src: "./assets/ABCDiatypePlusVariable.woff2",
  variable: "--font-abc",
});

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: PropsWithChildren) {
  return (
    <html lang="en" className={customFont.variable + " mono lg:p-6"}>
      {/* <html lang="en" className={customFont.className + " mono"}> */}
      <body className="mx-auto flex flex-col bg-dark-background px-3 pt-14 pb-20 lg:rounded-2xl lg:px-36">
        <ClientProvider>
          <WagmiProvider>
            <Navbar />
            <main className="flex-auto font-mono">{children}</main>
            <Footer />
          </WagmiProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
