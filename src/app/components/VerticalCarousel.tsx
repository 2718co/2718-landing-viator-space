'use client';

import { clsx } from 'clsx';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { type StaticImageData } from 'next/image';
import { MouseEventHandler } from 'react';

const horizontalVariants: Variants = {
    enter: (reverse) => ({
        y: `${reverse ? '-' : ''}100%`,
        x: 0
    }),
    active: {
        x: 0,
        y: 0
    },
    exit: (reverse) => ({
        y: `${reverse ? '' : '-'}100%`,
        x: 0
    })
};

interface ICarouselProps {
    carouselId: string;
    images: StaticImageData[];
    currentIdx: number;
    openLightbox?: MouseEventHandler<HTMLImageElement>;
    className?: string;
    reverse?: boolean;
}

const Carousel = (props: ICarouselProps) => {
    return (
        <div className={clsx('relative h-full w-full overflow-hidden', props.className)}>
            <AnimatePresence initial={false} mode="popLayout" custom={props.reverse}>
                <motion.img
                    key={props.carouselId + props.images[props.currentIdx % props.images.length]?.src}
                    src={props.images[props.currentIdx % props.images.length]?.src}
                    initial={`enter`}
                    animate={`active`}
                    exit={`exit`}
                    custom={props.reverse}
                    variants={horizontalVariants}
                    className={clsx('h-full w-full object-cover')}
                    transition={{
                        y: { duration: 1 },
                        opacity: { duration: 0.2 }
                    }}
                    onClick={props.openLightbox}
                ></motion.img>
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
