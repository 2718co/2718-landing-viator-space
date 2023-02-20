"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

const CURSOR_VARIANTS = ["default", "hover", "down"] as const;

type CursorVariant = (typeof CURSOR_VARIANTS)[number];

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition(() => ({
        x: event.clientX,
        y: event.clientY,
      }));
    };

    const handleMouseDown = () => {
      setCursorVariant(() => "down");
    };

    const handleMouseUp = () => {
      setCursorVariant(() => "default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 17,
      y: mousePosition.y - 17,
    },
    down: {
      cursor: "help",
      x: mousePosition.x - 17,
      y: mousePosition.y - 17,
    },
  };

  const centerVariants: Variants = {
    default: {
      r: 2,
    },
    down: {
      r: 4,
    },
  };

  const innerVariants: Variants = {
    default: {
      r: 6,
    },
    down: {
      r: 12,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-[34px] w-[34px] md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        damping: 100000,
      }}
      dragElastic={0}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
        viewBox="0 0 34 34"
      >
        {/* Outer */}
        <motion.circle
          cx="17"
          cy="17"
          r="15.5"
          stroke="#FF7218"
        ></motion.circle>
        {/* Center */}
        <motion.circle
          variants={centerVariants}
          animate={cursorVariant}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
          cx="17"
          cy="17"
          r="2"
          fill="#FF7218"
        ></motion.circle>
        {/* Inner */}
        <motion.circle
          variants={innerVariants}
          animate={cursorVariant}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
          cx="17"
          cy="17"
          r="6"
          stroke="#FF7218"
        ></motion.circle>
        {/* Cross */}
        <motion.path
          stroke="#FF7218"
          strokeWidth="0.5"
          d="M0 17h34M17 0v34"
        ></motion.path>
      </motion.svg>
    </motion.div>
  );
};

export default Cursor;
