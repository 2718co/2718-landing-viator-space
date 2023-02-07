"use client";
import GalleryCard from "./components/GalleryCard";
import bigImage from "../../../public/bigImage.png";
import funkyAnimated from "../assets/funky_dark.gif";
import { Disclosure, Transition } from "@headlessui/react";
import ChevronUpIcon from "./components/ChevronUpIcon";
import Image from "next/image";
import RedeemModal from "./components/RedeemModal";
import { useState } from "react";

const GalleryPage = () => {
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  return (
    <div className="flex flex-col justify-between px-1 lg:flex-row lg:space-x-8 lg:pl-6">
      <div className="w-full lg:w-96">
        <Image
          src={funkyAnimated}
          alt="Decorative animated banner"
          placeholder={"blur"}
          blurDataURL="data:image/webp;base64,UklGRoQEAABXRUJQVlA4WAoAAAAgAAAA8AIAMwAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBGAgAA0BkAnQEq8QI0AD8RfrZUP66rJCgUC6vwIglnbt7OH3/amgb1MDeszdBLs7UIAhyycJ9lZqOTg5lvdj5qK5jj6rEe2N44+qW+YaVfLvOXfQCjhSv7ejda5jj7ussRvl3ZZxTS/tVRbHJCwmHplTKhxTO7mb+YX1AiuI8ZkohqTwOMBaOMdn8a6SmPih1TzNzCdEWiFmDD63OtkC78Bx8O+ETb17h3w83oTk0qzxxdh8Ovl3oJQSaVxju0DNUsW3sHhYG8ephb3vDOGi8cedXDgu7bUoP9/hAA/uHr8iZRJ/VXdXN2hDvAtBlVI2qBLYQOyyMY03oHjiDeLFtw4v/9+VYle8NaAc6gnPBsEwD6YM22x7hcHylJRk+LStWEMBxiuXztRDrKitkEd60tzOqsnwHb0HFugia+WjyHb8WbBIlFiosuq1X7/j0JY+tPgIQAEJMYoEezCHqWzA0hc7owQtw4Ffofb3QVgaL/M9jwR4aqBfqZ5GIDTN7lqCA7zzzXUurDDGaSALlShbwAfuXchktWhYYQZAdwAULn8gKxoUv8vP7V0vGYNzLlCawkj4wfZwe/2WCYU0Z+tjGTudTNRuSmLiU2aPLz0imlnxRiymGVctv/Jrd6pqRGrA7xQaaRrxR1dTLT3jvYk7tnz+QNvWUHsV1y+6zgCuVIf+PP+Mou4ba/7MJSLK1gSZKEAJGQTyhwSx4QwtPFRP+TYYbIG441gxMPyDOZwPcfro0tIXBXGyQby7gZS+jsO3u+xppZTLETSEAA"
          draggable={false}
          onDragStart={undefined}
          className="h-7 w-full select-none lg:hidden"
        />
        <h3 className="mb-6 text-highlight-size text-white">Gallery</h3>
        <div className="mb-28 hidden lg:block">
          <div className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-highlight focus-visible:ring-opacity-75">
            <span>My NFTs</span>
            <input type={"checkbox"}></input>
          </div>

          {/*
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-highlight focus-visible:ring-opacity-75">
                  <span>Collection</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                    No.
                    <hr className="mt-3 bg-light-text" />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-highlight focus-visible:ring-opacity-75">
                  <span>Year</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  No.
                  <hr className="mt-3 bg-light-text" />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-highlight focus-visible:ring-opacity-75">
                  <span>Category</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                  No.
                  <hr className="mt-3 bg-light-text" />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          */}
        </div>
        <div className="mt-3 hidden flex-col text-text-size font-normal text-white lg:flex">
          <Image
            src={funkyAnimated}
            alt="Decorative animated banner"
            placeholder={"blur"}
            blurDataURL="data:image/webp;base64,UklGRoQEAABXRUJQVlA4WAoAAAAgAAAA8AIAMwAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBGAgAA0BkAnQEq8QI0AD8RfrZUP66rJCgUC6vwIglnbt7OH3/amgb1MDeszdBLs7UIAhyycJ9lZqOTg5lvdj5qK5jj6rEe2N44+qW+YaVfLvOXfQCjhSv7ejda5jj7ussRvl3ZZxTS/tVRbHJCwmHplTKhxTO7mb+YX1AiuI8ZkohqTwOMBaOMdn8a6SmPih1TzNzCdEWiFmDD63OtkC78Bx8O+ETb17h3w83oTk0qzxxdh8Ovl3oJQSaVxju0DNUsW3sHhYG8ephb3vDOGi8cedXDgu7bUoP9/hAA/uHr8iZRJ/VXdXN2hDvAtBlVI2qBLYQOyyMY03oHjiDeLFtw4v/9+VYle8NaAc6gnPBsEwD6YM22x7hcHylJRk+LStWEMBxiuXztRDrKitkEd60tzOqsnwHb0HFugia+WjyHb8WbBIlFiosuq1X7/j0JY+tPgIQAEJMYoEezCHqWzA0hc7owQtw4Ffofb3QVgaL/M9jwR4aqBfqZ5GIDTN7lqCA7zzzXUurDDGaSALlShbwAfuXchktWhYYQZAdwAULn8gKxoUv8vP7V0vGYNzLlCawkj4wfZwe/2WCYU0Z+tjGTudTNRuSmLiU2aPLz0imlnxRiymGVctv/Jrd6pqRGrA7xQaaRrxR1dTLT3jvYk7tnz+QNvWUHsV1y+6zgCuVIf+PP+Mou4ba/7MJSLK1gSZKEAJGQTyhwSx4QwtPFRP+TYYbIG441gxMPyDOZwPcfro0tIXBXGyQby7gZS+jsO3u+xppZTLETSEAA"
            className="h-7 w-full"
          />
          <p className="mt-3">
            2718 is a native urban web3 culture brand at the intersection of
            urban fashion, technology, and artistical expression. We thrive on
            collaborating and working together as a collective. We know that
            passionate coordinated team work out works any person or entity. For
            this reason we collectivize.
          </p>
          <span className="mt-3">@2718.eth</span>
        </div>
      </div>
      <div className="grid grid-flow-row gap-8 xl:grid-cols-2">
        {Array(7)
          .fill(0)
          .map((card, index) => (
            <GalleryCard
              key={card + index}
              collection="2718 Genesis"
              imgUrl={bigImage}
              name="Framed Collectors Shirt"
              price={5.75746}
              serialNumber={index}
              total={23}
              onClick={(e: any) => {
                e.preventDefault();
                setRedeemModalOpen(() => true);
              }}
            />
          ))}
      </div>
      <RedeemModal open={redeemModalOpen} setOpen={setRedeemModalOpen} />
    </div>
  );
};

export default GalleryPage;
