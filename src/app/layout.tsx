
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import AuctionHouseProvider from "../client/auctionHouse";
import WagmiProvider from "../client/wagmi";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import localFont from "next/font/local";

const customFont = localFont({
  src: "./assets/ABCDiatypePlusVariable.woff2",
  variable: "--font-abc",
});

const Cursor = dynamic(() => import("./components/Cursor"), {
  ssr: true,
});

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${customFont.variable} mono bg-dark-background font-mono`}
    >
      <head />
      <body className="rounded-3xl bg-[#D9D9D9] p-0 lg:p-6">
        <div className="relative flex w-full flex-col bg-dark-background px-3 pt-14 pb-20 lg:rounded-2xl lg:px-36">
          <Suspense fallback={<div>Loading...</div>}>
              <WagmiProvider>
                <AuctionHouseProvider>
                  <Navbar />
                  <main className="flex-auto font-mono">{children}</main>
                  <Footer />
                </AuctionHouseProvider>
              </WagmiProvider>
            <Cursor />
          </Suspense>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
