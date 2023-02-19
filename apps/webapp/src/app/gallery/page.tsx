"use client";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import bigImage from "../../../public/bigImage.png";
import funkyAnimated from "../assets/funky_dark.gif";
import Checkbox from "../components/Checkbox";
import GalleryCard from "./components/GalleryCard";
import RedeemModal from "./components/RedeemModal";

const GalleryPage = () => {
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  return (
    <div className="flex flex-col justify-between px-1 lg:flex-row lg:space-x-8 lg:pl-6">
      <div className="sticky top-0 h-screen w-full lg:w-96">
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
            <input
              type={"checkbox"}
              className="h-5 w-5 rounded-md border-2 border-light-background accent-dark-background"
            ></input>
          </div>
          <div className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring focus-visible:ring-highlight focus-visible:ring-opacity-75">
            <span>My NFTs</span>
            <Checkbox />
          </div>
        </div>
        <div className="mt-3 hidden flex-col text-text-size font-normal text-white lg:flex">
          <Image
            src={funkyAnimated}
            alt="Decorative animated banner"
            placeholder={"blur"}
            blurDataURL="data:image/webp;base64,UklGRoQEAABXRUJQVlA4WAoAAAAgAAAA8AIAMwAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBGAgAA0BkAnQEq8QI0AD8RfrZUP66rJCgUC6vwIglnbt7OH3/amgb1MDeszdBLs7UIAhyycJ9lZqOTg5lvdj5qK5jj6rEe2N44+qW+YaVfLvOXfQCjhSv7ejda5jj7ussRvl3ZZxTS/tVRbHJCwmHplTKhxTO7mb+YX1AiuI8ZkohqTwOMBaOMdn8a6SmPih1TzNzCdEWiFmDD63OtkC78Bx8O+ETb17h3w83oTk0qzxxdh8Ovl3oJQSaVxju0DNUsW3sHhYG8ephb3vDOGi8cedXDgu7bUoP9/hAA/uHr8iZRJ/VXdXN2hDvAtBlVI2qBLYQOyyMY03oHjiDeLFtw4v/9+VYle8NaAc6gnPBsEwD6YM22x7hcHylJRk+LStWEMBxiuXztRDrKitkEd60tzOqsnwHb0HFugia+WjyHb8WbBIlFiosuq1X7/j0JY+tPgIQAEJMYoEezCHqWzA0hc7owQtw4Ffofb3QVgaL/M9jwR4aqBfqZ5GIDTN7lqCA7zzzXUurDDGaSALlShbwAfuXchktWhYYQZAdwAULn8gKxoUv8vP7V0vGYNzLlCawkj4wfZwe/2WCYU0Z+tjGTudTNRuSmLiU2aPLz0imlnxRiymGVctv/Jrd6pqRGrA7xQaaRrxR1dTLT3jvYk7tnz+QNvWUHsV1y+6zgCuVIf+PP+Mou4ba/7MJSLK1gSZKEAJGQTyhwSx4QwtPFRP+TYYbIG441gxMPyDOZwPcfro0tIXBXGyQby7gZS+jsO3u+xppZTLETSEAA"
            className="h-7 w-full select-none"
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
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                setRedeemModalOpen(() => true);
              }}
            />
          ))}
      </div>
      {typeof window !== "undefined" &&
        createPortal(
          <RedeemModal open={redeemModalOpen} setOpen={setRedeemModalOpen} />,
          document.body
        )}
    </div>
  );
};

export default GalleryPage;
