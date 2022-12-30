"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image, { type StaticImageData } from "next/image";
import type { Dispatch, SetStateAction } from "react";
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                className={"flex h-[70vh] flex-row items-center space-x-10"}
              >
                <div
                  className="grid h-40 w-40 cursor-pointer place-items-center rounded-full outline-none hover:bg-black/30 focus:outline-none"
                  onClick={() =>
                    setCurrentImage((currentImage) =>
                      Math.abs((currentImage - 1) % (imgUrls?.length ?? 1))
                    )
                  }
                >
                  <LeftArrowIcon />
                </div>

                <div className="aspect-square h-full bg-green-400">
                  {imgUrls?.[currentImage] && (
                    <Image
                      src={imgUrls[currentImage]!}
                      alt="Preview of image"
                      className="h-full w-full select-none object-cover"
                    />
                  )}
                </div>
                <div
                  className="grid h-40 w-40 cursor-pointer place-items-center rounded-full hover:bg-black/30"
                  onClick={() =>
                    setCurrentImage((currentImage) =>
                      Math.abs((currentImage + 1) % (imgUrls?.length ?? 1))
                    )
                  }
                >
                  <LeftArrowIcon className="rotate-180" />
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
