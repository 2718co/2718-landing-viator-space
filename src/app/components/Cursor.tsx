'use client';

import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { motion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const CURSOR_VARIANTS = ['default', 'hover', 'down'] as const;

type CursorVariant = (typeof CURSOR_VARIANTS)[number];

const Cursor = () => {
    // Check if rainbow modal is open or not for cursor
    const { connectModalOpen } = useConnectModal();
    const { chainModalOpen } = useChainModal();
    const styleRef = useRef<HTMLStyleElement | null>(null);

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

    // Function to add the CSS rule for cursor: pointer when rainbow is open to respect cursor styles
    const addPointerCssRule = () => {
        styleRef.current = document.createElement('style');
        styleRef.current.innerHTML = `
        @media (min-width: 768px) {
            button {
                cursor: pointer !important;
            }
        }
    `;
        document.head.appendChild(styleRef.current);
    };

    // Function to add the CSS rule for cursor: none when rainbow is closed
    const addNoneCssRule = () => {
        styleRef.current = document.createElement('style');
        styleRef.current.innerHTML = `
        @media (min-width: 768px) {
            *,
            button {
                cursor: none !important;
            }
        }
    `;
        document.head.appendChild(styleRef.current);
    };

    // Function to remove the CSS rule
    const removeCssRule = () => {
        if (styleRef.current && styleRef.current.parentElement) {
            styleRef.current.parentElement.removeChild(styleRef.current);
            styleRef.current = null;
        }
    };

    useEffect(() => {
        if (connectModalOpen) {
            if (!styleRef.current) {
                addPointerCssRule();
            }
        } else {
            if (!styleRef.current) {
                addNoneCssRule();
            }
        }

        return () => {
            removeCssRule();
        };
    }, [connectModalOpen]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition(() => ({
                x: event.clientX,
                y: event.clientY
            }));
        };

        const handleMouseDown = () => {
            setCursorVariant(() => 'down');
        };

        const handleMouseUp = () => {
            setCursorVariant(() => 'default');
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const variants: Variants = {
        default: {
            x: mousePosition.x - 17,
            y: mousePosition.y - 17
        },
        down: {
            cursor: 'help',
            x: mousePosition.x - 17,
            y: mousePosition.y - 17
        }
    };

    const centerVariants: Variants = {
        default: {
            r: 2
        },
        down: {
            r: 4
        }
    };

    const innerVariants: Variants = {
        default: {
            r: 6
        },
        down: {
            r: 12
        }
    };

    return (
        (!connectModalOpen || !chainModalOpen) && (
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[34px] w-[34px] md:block"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: 'spring',
                    damping: 100000
                }}
                dragElastic={0}
            >
                <motion.svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 34 34">
                    {/* Outer */}
                    <motion.circle cx="17" cy="17" r="15.5" stroke="#FF7218"></motion.circle>
                    {/* Center */}
                    <motion.circle
                        variants={centerVariants}
                        animate={cursorVariant}
                        transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1]
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
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1]
                        }}
                        cx="17"
                        cy="17"
                        r="6"
                        stroke="#FF7218"
                    ></motion.circle>
                    {/* Cross */}
                    <motion.path stroke="#FF7218" strokeWidth="0.5" d="M0 17h34M17 0v34"></motion.path>
                </motion.svg>
            </motion.div>
        )
    );
};

export default Cursor;
