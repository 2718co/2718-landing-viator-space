import React from "react";
import Image, { type StaticImageData } from "next/image";
import PillCounter from "../../components/PillCounter";
import Link from "next/link";

interface IGalleryCardProps {
  imgUrl: StaticImageData | string;
  blurDataUrl?: string;
  collection: string;
  name: string;
  price: number;
  serialNumber: number;
  total: number;
}

const GalleryCard = (props: IGalleryCardProps) => {
  return (
    <Link
      href={"#"}
      className="w-full overflow-hidden rounded-3xl bg-light-background lg:w-[430px]"
    >
      <Image
        src={props.imgUrl}
        alt={props.name}
        placeholder="blur"
        className="aspect-[373/355] rounded-3xl object-cover shadow-md transition-shadow hover:shadow-xl"
      />

      <div className="flex flex-col p-4">
        <span className="text-highlight">{props.collection}</span>
        <span className="mt-1 text-title-2-size text-black">{props.name}</span>
        <span className="mt-5 text-subtitle-2-size text-light-text">
          Sold primarly for {props.price.toPrecision(2)} ETH
        </span>

        <span className="mt-5">
          <PillCounter index={props.serialNumber} total={props.total} />
        </span>
      </div>
    </Link>
  );
};

export default GalleryCard;
