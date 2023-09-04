"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAccount } from "wagmi";
import bigImage from "../../public/bigImage.png";
import hangingImage from "../../public/hangingImage.png";
import squareLeft from "../../public/squareLeft.png";
import squareRight from "../../public/squareRight.png";
import tallImage from "../../public/tallImage.png";
import { AuthContext } from "../client/wagmi";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion";
import BidModal from "./components/BidModal";
import ETHLogo from "./components/ETHLogo";
import HorizontalCarousel from "./components/HorizontalCarousel";
import Lightbox from "./components/Lightbox";
import MetamaskLogo from "./components/logos/metamask";
import WalletConnectLogo from "./components/logos/walletConnect";
import OffersTable from "./components/OffersTable";
import PillCounter from "./components/PillCounter";
import VerticalCarousel from "./components/VerticalCarousel";

const images = [bigImage, hangingImage, squareLeft, squareRight, tallImage];

const GALLERY_SLIDESHOW_INTERVAL = 4000;

export default function Home() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isConnected } = useAccount();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  const { setModalOpen: openAuth } = useContext(AuthContext);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = () => setLightboxOpen(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!prefersReducedMotion) {
      const interval = setInterval(
        () => setCurrentIdx((prev) => prev + 1),
        GALLERY_SLIDESHOW_INTERVAL
      );

      return () => {
        clearInterval(interval);
      };
    } else {
      console.log("No animation since user prefers reduced motion");
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="grid grid-flow-row gap-x-10 gap-y-2 lg:grid-cols-2 lg:gap-y-8 ">
        {/* main */}
        <div className="col-span-1 flex flex-col overflow-hidden rounded-3xl bg-light-background lg:col-span-2">
          <AnimatePresence initial={false} mode="wait">
            <div
              id="gallery"
              className="relative flex h-[544px] cursor-pointer flex-row"
            >
              {/* Main Image */}
              <div className="relative flex-[826]">
                <HorizontalCarousel
                  carouselId={`carousel1`}
                  currentIdx={currentIdx}
                  images={images}
                  openLightbox={openLightbox}
                />

                {typeof window !== "undefined" &&
                  createPortal(
                    <Lightbox
                      open={lightboxOpen}
                      setOpen={setLightboxOpen}
                      imgUrls={[
                        bigImage,
                        tallImage,
                        hangingImage,
                        squareLeft,
                        squareRight,
                      ]}
                    />,
                    document.body
                  )}
                <div className="absolute top-4 left-5">
                  <PillCounter index={3} total={32} />
                </div>
              </div>

              <div
                className="relative hidden flex-[544] lg:flex" // grid-rows-4 grid-cols-3
                onClick={openLightbox}
              >
                <HorizontalCarousel
                  carouselId={`carousel2`}
                  currentIdx={currentIdx + 1}
                  images={images}
                  className="flex-[15]"
                />

                <div className="flex h-full flex-[20] flex-col">
                  <HorizontalCarousel
                    carouselId={`carousel3`}
                    currentIdx={currentIdx + 2}
                    images={images}
                    className="flex-[3]"
                  />

                  <div className="flex flex-row">
                    <VerticalCarousel
                      carouselId={`carousel4`}
                      currentIdx={currentIdx + 3}
                      images={images}
                      className="aspect-square flex-1"
                    />

                    <HorizontalCarousel
                      carouselId={`carousel5`}
                      currentIdx={currentIdx + 4}
                      images={images}
                      className="aspect-square flex-1"
                      reverse
                    />
                  </div>
                </div>

                <div className="absolute inset-0 z-10 bg-slate-500 opacity-60" />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-b from-transparent to-light-background"></div>
            </div>
          </AnimatePresence>

          <div className="flex flex-col bg-none pt-9 pb-2 lg:flex-row lg:px-5 lg:py-9">
            {/* Description */}
            <div className="flex flex-1 flex-col space-y-1 px-2 pb-2 lg:px-0 lg:pb-0">
              <span className="font-mono text-pretitle-size uppercase">
                Genesis collection
              </span>
              <h1 className="font-mono text-title-1-size font-medium">
                Viator TRAPPIST-1 Mission
              </h1>
              <span>
                <p className="max-w-[58ch] font-mono text-xs leading-[15px] text-light-text">
                  Viator is the autonomous space probe exploring the TRAPPIST-1
                  solar system in search for distant relics. This shirts
                  represents one from 27 limited genesis NFT&apos;s from the
                  2718 collective.
                </p>
                <p className="mt-3 hidden font-mono text-xs leading-[15px] text-light-text lg:block">
                  Discover all minted NFT&apos;s{" "}
                  <Link href={"/gallery"} className="text-highlight underline">
                    here
                  </Link>
                  .
                </p>
              </span>
            </div>

            {/* Mobile Separator */}
            <div className="relative h-8 overflow-clip bg-dark-background lg:hidden">
              <div className="absolute -top-3 h-6  w-full rounded-full bg-light-background"></div>
              <div className="absolute -bottom-3 h-6  w-full rounded-full bg-light-background"></div>
            </div>

            {/* Bid Details */}
            <div className="flex flex-1 flex-col space-y-4 rounded-b-md px-2 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-4 lg:gap-y-8 lg:space-y-0 lg:px-0">
              {/* Top Bid */}
              <div className="flex flex-row lg:space-x-3">
                <span className="hidden w-4 place-items-center lg:grid lg:w-8 lg:gap-y-3">
                  <div className="">
                    <span className="font-mono text-title-3-size leading-6 text-light-text lg:text-lg">
                      &nbsp;
                    </span>
                  </div>
                  <ETHLogo />
                </span>
                <span className="grid grid-flow-row gap-y-1 lg:gap-y-3">
                  <span className="font-mono text-title-3-size leading-6 text-light-text lg:text-lg">
                    Top bid
                  </span>
                  <span className="inline-flex items-baseline space-x-3">
                    <span className="font-mono text-title-1-size font-semibold text-dark-text lg:text-highlight-size">
                      <span className="lg:hidden">Ξ </span>
                      7.334{" "}
                    </span>
                    <span className="font-mono text-title-3-size leading-6 text-light-text lg:text-lg">
                      ($8,023.31)
                    </span>
                  </span>
                </span>
              </div>
              {/* Countdown */}
              <div className="grid grid-flow-row gap-y-1 rounded-t-md px-2 lg:gap-y-3 lg:px-0">
                <span className="font-mono text-title-3-size leading-6 text-light-text lg:text-lg">
                  Time left
                </span>
                <span className="font-mono text-title-1-size font-semibold text-dark-text lg:text-highlight-size">
                  21h 32min 23s
                </span>
              </div>
              {/* Connect or Bid Button */}
              <div className="col-span-2">
                {isConnected ? (
                  <>
                    <button
                      onClick={() => setIsBidModalOpen(true)}
                      className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                    >
                      Place Bid
                    </button>
                    {typeof window !== "undefined" &&
                      createPortal(
                        <BidModal
                          open={isBidModalOpen}
                          setOpen={setIsBidModalOpen}
                        />,
                        document.body
                      )}
                  </>
                ) : (
                  <button
                    onClick={() => openAuth(true)}
                    className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="col-span-1 overflow-hidden rounded-3xl bg-black">
          <video
            src="/ai-art.mp4"
            autoPlay
            muted
            className="h-full w-full object-cover"
          />
        </div>

        {/* Offers */}
        <div className="col-span-1 rounded-3xl">
          <OffersTable />
        </div>
      </div>

      {!isConnected && (
        <div
          className="fixed inset-x-0 bottom-0 flex flex-row items-center justify-between rounded-t-3xl bg-highlight/60 px-5 pb-8 pt-6 backdrop-blur lg:hidden"
          onClick={() => openAuth(true)}
        >
          <span className="text-2xl font-semibold leading-6 text-gray-900">
            Connect Wallet
          </span>

          <div className="flex flex-row -space-x-2">
            <MetamaskLogo />
            <WalletConnectLogo />
          </div>
        </div>
      )}
    </>
  );
}
