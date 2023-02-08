"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { navlinks } from "./config";

interface AnimateValues {
  offsetLeft: number;
  width: number;
  opacity: number;
}

export const DesktopNavlink = ({
  path,
  label,
  setAnimateValues,
}: {
  path: string;
  label: string;
  setAnimateValues?: React.Dispatch<React.SetStateAction<AnimateValues>>;
}) => {
  const self = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      key={label}
      ref={self}
      className="h-full py-4 px-8"
      onHoverStart={(e: PointerEvent, i) => {
        console.log("onHoverStart", e, i);
        setAnimateValues?.((prev) => {
          const newVals = {
            ...prev,
            opacity: 1,
            offsetLeft: self.current?.offsetLeft ?? 0,
            width: self.current?.offsetWidth ?? 1,
          };
          console.log(newVals);
          return newVals;
        });
      }}
    >
      <Link
        href={path}
        className="box-border rounded-2xl font-mono text-highlight " //hover:bg-hover-rectangle
      >
        {label}
      </Link>
    </motion.div>
  );
};

const DesktopNavlinks = () => {
  const [animateValues, setAnimateValues] = useState<AnimateValues>({
    opacity: 0,
    offsetLeft: 0,
    width: 0,
  });
  return (
    <motion.nav
      className="relative hidden flex-1 flex-row justify-start lg:flex"
      onHoverEnd={(e, i) => {
        console.log("onHoverEnd", e, i);
        setAnimateValues?.((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }}
    >
      <motion.div
        className="absolute h-full rounded-2xl bg-hover-rectangle px-8"
        animate={{
          opacity: animateValues.opacity,
          left: animateValues.offsetLeft,
          width: animateValues.width,
          transitionDuration: "150ms",
          transitionTimingFunction: "linear",
        }}
      />
      {navlinks.map(({ path, label }) => (
        <DesktopNavlink
          key={label}
          path={path}
          label={label}
          setAnimateValues={setAnimateValues}
        />
      ))}
    </motion.nav>
  );
};

export default DesktopNavlinks;
