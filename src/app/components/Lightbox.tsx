"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image, { type StaticImageData } from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { Fragment, useState } from "react";
import LeftArrowIcon from "./LeftArrowIcon";

interface ILightboxProps {
  imgUrls?: (string | StaticImageData)[];
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Lightbox = ({
  imgUrls,
  open,
  setOpen = () => false,
}: ILightboxProps): JSX.Element => {
  const [currentImage, setCurrentImage] = useState(0);

  // Basically items = [1, 2, 3, 4]
  const items = useMemo(() => imgUrls ?? [], [imgUrls]);

  // The Keypress Event Handler
  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        // If supposed previous child is < 0 set it to last child
        setCurrentImage((a) => (a - 1 < 0 ? items.length - 1 : a - 1));
      } else if (e.key === "ArrowRight") {
        // If supposed next child is > length -1 set it to first child
        setCurrentImage((a) => (a + 1 > items.length - 1 ? 0 : a + 1));
      }
    },
    [items]
  );

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-hidden">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={
                  "relative flex w-full flex-row items-center lg:h-[70vh] lg:w-auto lg:space-x-10"
                }
              >
                <div
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 -z-10"
                ></div>

                <div
                  className="group grid h-4 w-4 cursor-pointer place-items-center rounded-full outline-none focus:outline-none lg:h-40 lg:w-40"
                  onClick={() =>
                    setCurrentImage((currentImage) =>
                      Math.abs((currentImage - 1) % (imgUrls?.length ?? 1))
                    )
                  }
                >
                  <LeftArrowIcon className="h-4 w-4 group-hover:opacity-30 lg:h-auto lg:w-auto" />
                </div>

                <div className="relative aspect-square h-full w-full overflow-hidden rounded-3xl">
                  {imgUrls?.[currentImage] && (
                    <Image
                      src={imgUrls[currentImage]!}
                      alt="Preview of image"
                      fill
                      className="h-full w-full select-none object-cover"
                    />
                  )}
                </div>

                <div
                  className="group grid h-4 w-4 cursor-pointer place-items-center rounded-full lg:h-40 lg:w-40"
                  onClick={() =>
                    setCurrentImage((currentImage) =>
                      Math.abs((currentImage + 1) % (imgUrls?.length ?? 1))
                    )
                  }
                >
                  <LeftArrowIcon className="h-4 w-4 rotate-180 group-hover:opacity-30 lg:h-auto lg:w-auto" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Lightbox;
