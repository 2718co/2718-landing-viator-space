'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { navlinks } from './config';

interface AnimateValues {
    offsetLeft: number;
    width: number;
    opacity: number;
}

const MotionLink = motion(Link);

export const DesktopNavlink = ({
    path,
    label,
    setAnimateValues
}: {
    path: string;
    label: string;
    setAnimateValues?: React.Dispatch<React.SetStateAction<AnimateValues>>;
}) => {
    const self = useRef<HTMLDivElement>(null);
    return (
        <MotionLink
            key={label}
            ref={self}
            href={path}
            className="h-full px-8 py-4"
            onHoverStart={() => {
                setAnimateValues?.((prev) => {
                    const newVals = {
                        ...prev,
                        opacity: 1,
                        offsetLeft: self.current?.offsetLeft ?? 0,
                        width: self.current?.offsetWidth ?? 1
                    };
                    return newVals;
                });
            }}
        >
            <span
                className="box-border rounded-2xl font-mono text-highlight " //hover:bg-hover-rectangle
            >
                {label}
            </span>
        </MotionLink>
    );
};

const DesktopNavlinks = () => {
    const [animateValues, setAnimateValues] = useState<AnimateValues>({
        opacity: 0,
        offsetLeft: 0,
        width: 0
    });
    return (
        <motion.nav
            className="relative hidden flex-1 flex-row justify-start lg:flex"
            onHoverEnd={() => {
                setAnimateValues?.((prev) => ({
                    ...prev,
                    opacity: 0
                }));
            }}
        >
            <motion.div
                className="pointer-events-none absolute h-full rounded-2xl bg-hover-rectangle px-8"
                initial={{
                    opacity: 0,
                    left: 0,
                    width: 0
                }}
                animate={{
                    opacity: animateValues.opacity,
                    left: animateValues.offsetLeft,
                    width: animateValues.width,
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'linear'
                }}
            />
            {navlinks.map(({ path, label }) => (
                <DesktopNavlink key={label} path={path} label={label} setAnimateValues={setAnimateValues} />
            ))}
        </motion.nav>
    );
};

export default DesktopNavlinks;
