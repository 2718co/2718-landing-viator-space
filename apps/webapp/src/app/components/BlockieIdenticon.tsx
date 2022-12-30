import React, { useEffect, useRef, useState } from "react";
import { renderIcon } from "@download/blockies";
import Image from "next/image";

interface IBlockieIdenticonProps {
  address: string;
  diameter: number;
  alt?: string;
  borderRadius: string;
}

const BlockieIdenticon = ({
  address,
  diameter,
  alt = "Blockie Identicon",
  borderRadius,
}: IBlockieIdenticonProps) => {
  const [dataUrl, setDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderIcon({ seed: address.toLowerCase() }, canvas);
    const updatedDataUrl = canvas.toDataURL();

    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl);
    }
  }, [dataUrl, address]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {dataUrl && (
        <Image
          src={dataUrl}
          height={diameter}
          width={diameter}
          style={{
            borderRadius,
          }}
          alt={alt}
        />
      )}
    </>
  );
};

export default BlockieIdenticon;
