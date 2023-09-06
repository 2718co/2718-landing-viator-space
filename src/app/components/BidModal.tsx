'use client';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

import type { Dispatch, SetStateAction } from 'react';
import { Fragment, useRef, useState } from 'react';
import { useBalance } from 'wagmi';
import funkyAnimated from '../assets/funky_dark.gif';
import CloseIcon from './Close';
import ETHLogo from './ETHLogo';

interface IBidModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const BidModal = ({ open, setOpen }: IBidModalProps) => {
    const bidInputRef = useRef<HTMLInputElement | null>(null);
    // const [bidAmount, setBidAmount] = useState<string>('');

    const [
        confirmingTransaction
        // setConfirmingTransaction
    ] = useState(false);

    const { data: balance, isLoading: isLoadingBalance } = useBalance();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10 font-mono" initialFocus={bidInputRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center lg:p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-t-xl bg-light-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl lg:rounded-3xl">
                                <div className="px-5 py-9 lg:px-7 lg:py-11">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <div className="mb-7 flex flex-row justify-between">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-2xl font-semibold leading-6 text-gray-900"
                                            >
                                                {confirmingTransaction ? 'Confirm Transaction' : 'Place a bid'}
                                            </Dialog.Title>
                                            <button className="mr-4 hover:opacity-90" onClick={() => setOpen(false)}>
                                                <CloseIcon />
                                            </button>
                                        </div>

                                        {confirmingTransaction ? (
                                            <>
                                                <Image
                                                    src={funkyAnimated}
                                                    alt="Decorative animated banner"
                                                    placeholder={'blur'}
                                                    blurDataURL="data:image/webp;base64,UklGRoQEAABXRUJQVlA4WAoAAAAgAAAA8AIAMwAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBGAgAA0BkAnQEq8QI0AD8RfrZUP66rJCgUC6vwIglnbt7OH3/amgb1MDeszdBLs7UIAhyycJ9lZqOTg5lvdj5qK5jj6rEe2N44+qW+YaVfLvOXfQCjhSv7ejda5jj7ussRvl3ZZxTS/tVRbHJCwmHplTKhxTO7mb+YX1AiuI8ZkohqTwOMBaOMdn8a6SmPih1TzNzCdEWiFmDD63OtkC78Bx8O+ETb17h3w83oTk0qzxxdh8Ovl3oJQSaVxju0DNUsW3sHhYG8ephb3vDOGi8cedXDgu7bUoP9/hAA/uHr8iZRJ/VXdXN2hDvAtBlVI2qBLYQOyyMY03oHjiDeLFtw4v/9+VYle8NaAc6gnPBsEwD6YM22x7hcHylJRk+LStWEMBxiuXztRDrKitkEd60tzOqsnwHb0HFugia+WjyHb8WbBIlFiosuq1X7/j0JY+tPgIQAEJMYoEezCHqWzA0hc7owQtw4Ffofb3QVgaL/M9jwR4aqBfqZ5GIDTN7lqCA7zzzXUurDDGaSALlShbwAfuXchktWhYYQZAdwAULn8gKxoUv8vP7V0vGYNzLlCawkj4wfZwe/2WCYU0Z+tjGTudTNRuSmLiU2aPLz0imlnxRiymGVctv/Jrd6pqRGrA7xQaaRrxR1dTLT3jvYk7tnz+QNvWUHsV1y+6zgCuVIf+PP+Mou4ba/7MJSLK1gSZKEAJGQTyhwSx4QwtPFRP+TYYbIG441gxMPyDOZwPcfro0tIXBXGyQby7gZS+jsO3u+xppZTLETSEAA"
                                                    className="h-7"
                                                />

                                                <span>Confirm the transaction in your connected wallet.</span>

                                                <div className="mb-7 mt-4 text-left text-subtitle-2-size text-light-text lg:px-4">
                                                    <p>
                                                        After the confirmation and the clearance, by the Ethereum
                                                        network, of your transaction your bid will be finalized and will
                                                        appear on this site.
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex flex-col space-x-3 lg:flex-row">
                                                    {/* COIN */}
                                                    <div className="flex flex-row space-x-2 rounded-xl bg-white p-4">
                                                        {/* ICON */}
                                                        <div className="h-8">
                                                            <ETHLogo />
                                                        </div>
                                                        {/* COIN NAME */}
                                                        <span className="text-button-text-size">ETH</span>
                                                    </div>

                                                    {/* BID */}
                                                    <div className="relative flex-grow rounded-xl bg-white">
                                                        <input
                                                            ref={bidInputRef}
                                                            type="text"
                                                            inputMode="numeric"
                                                            name="bidValue"
                                                            placeholder="7.39"
                                                            onChange={(e) => setBidAmount(e.currentTarget.value)}
                                                            className="h-full rounded-xl px-4 text-button-text-size outline-none placeholder:text-light-text"
                                                        />
                                                        <span className="absolute bottom-4 right-3 text-xs text-highlight">
                                                            Balance:{' '}
                                                            {isLoadingBalance ? 'loading...' : balance?.decimals} ETH
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mb-7 mt-4 text-left text-subtitle-2-size text-light-text lg:px-4">
                                                    <p>
                                                        The bid must be at least 0.05 ETH higher than the previous bid.
                                                        Starting bid was 0.1 ETH. The auction ends exactly after 24
                                                        hours. Unless edition 27 is auctioned the next auction will
                                                        start immediately.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {confirmingTransaction ? (
                                        <button className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button">
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            // onClick={() => placeBid(bidAmount)}
                                            className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Place Bid
                                        </button>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default BidModal;
