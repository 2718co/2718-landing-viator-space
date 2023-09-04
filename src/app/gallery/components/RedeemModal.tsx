'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import CloseIcon from '../../components/Close';
import Pen from '../assets/Pen.svg';

// TODO: this
enum RedeemPage {
    Form,
    Verification,
    Signing
}

interface IRedeemModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const RedeemModal = ({ open, setOpen }: IRedeemModalProps) => {
    const inputNameRef = useRef<HTMLInputElement | null>(null);
    const [currentPage, setCurrentPage] = useState(RedeemPage.Form);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        province: '',
        zip: '',
        country: ''
    });

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={inputNameRef} onClose={setOpen}>
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-light-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className=" px-7 py-11">
                                    <div className="mt-3 text-center font-mono sm:ml-4 sm:mt-0 sm:text-left">
                                        {currentPage === RedeemPage.Form && (
                                            <>
                                                <div className="mb-5 flex flex-row justify-between">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-2xl font-semibold leading-6 text-gray-900"
                                                    >
                                                        Claim your Shirt
                                                    </Dialog.Title>
                                                    <button
                                                        className="mr-4 hover:opacity-90"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="relative col-span-3">
                                                        <input
                                                            ref={inputNameRef}
                                                            id="name"
                                                            value={formData.fullName}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    fullName: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="Full name"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />
                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="name"
                                                        >
                                                            Full name
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-3">
                                                        <input
                                                            id="email"
                                                            value={formData.email}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    email: e.target.value
                                                                }))
                                                            }
                                                            type="email"
                                                            placeholder="E-mail address"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />
                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="email"
                                                        >
                                                            E-mail address
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-3">
                                                        <input
                                                            id="street"
                                                            value={formData.address}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    address: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="Street address and house number"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />

                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="street"
                                                        >
                                                            Street address and house number
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-2">
                                                        <input
                                                            id="city"
                                                            value={formData.city}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    city: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="City"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />

                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="city"
                                                        >
                                                            City
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-1">
                                                        <input
                                                            id="province"
                                                            value={formData.province}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    province: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="Province"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />

                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="province"
                                                        >
                                                            Province
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-1">
                                                        <input
                                                            id="zip"
                                                            value={formData.zip}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    zip: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="Zip Code"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />
                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="zip"
                                                        >
                                                            Zip Code
                                                        </label>
                                                    </div>
                                                    <div className="relative col-span-2">
                                                        <input
                                                            id="country"
                                                            value={formData.country}
                                                            onChange={(e) =>
                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    country: e.target.value
                                                                }))
                                                            }
                                                            type="text"
                                                            placeholder="Country"
                                                            className="peer w-full rounded-xl bg-white px-4 pb-4 pt-8 placeholder-transparent placeholder-shown:pb-6 placeholder-shown:pt-6"
                                                        />

                                                        <label
                                                            className="absolute left-4 top-2 text-xs text-light-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-light-text"
                                                            htmlFor="country"
                                                        >
                                                            Country
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mt-7 grid gap-2">
                                                    <div className="flex flex-row items-start justify-start">
                                                        <input type="checkbox" name="terms" id="terms" />
                                                        <span className="ml-2 flex-grow text-text-size text-light-text">
                                                            I agree to the{' '}
                                                            <Link
                                                                href={'/terms'}
                                                                target="_blank"
                                                                className="text-highlight underline hover:opacity-80"
                                                            >
                                                                Terms &amp; Conditions
                                                            </Link>{' '}
                                                            and have read the{' '}
                                                            <Link
                                                                href={'/'}
                                                                target="_blank"
                                                                className="text-highlight underline hover:opacity-80"
                                                            >
                                                                Privacy Policy
                                                            </Link>{' '}
                                                            through.
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Continue Button */}
                                                <div className="mt-5">
                                                    <button
                                                        onClick={() => setCurrentPage(RedeemPage.Verification)}
                                                        className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {currentPage === RedeemPage.Verification && (
                                            <>
                                                <div className="mb-20 flex flex-row justify-between">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-2xl font-semibold leading-6 text-gray-900"
                                                    >
                                                        Confirm details
                                                    </Dialog.Title>
                                                    <button
                                                        className="mr-4 hover:opacity-90"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                </div>
                                                <div className="grid gap-4">
                                                    <div className="flex flex-col text-light-text">
                                                        <span className="text-dark-text">Shipping address:</span>
                                                        <span>{formData.fullName}</span>
                                                        <span>{formData.email}</span>
                                                        <span>{formData.address}</span>
                                                        <span>{formData.province}</span>
                                                        <span>{formData.zip}</span>
                                                        <span>{formData.country}</span>
                                                    </div>
                                                    <a
                                                        className="cursor-pointer text-subtitle-size text-highlight underline"
                                                        onClick={() => setCurrentPage(RedeemPage.Form)}
                                                    >
                                                        Return to edit address
                                                    </a>
                                                </div>
                                                <div className="mt-12 grid grid-flow-col gap-4 rounded-xl bg-highlight/20 p-4">
                                                    <div className="">⚠️</div>
                                                    <p className="text-subtitle-size text-light-text">
                                                        Irreversible change: You are about to sign an on-chain message
                                                        to claim the shirt. You will change the “claimed” state from
                                                        your NFT from false to true.
                                                    </p>
                                                </div>
                                                <div className="mt-5">
                                                    <button
                                                        onClick={() => setCurrentPage(RedeemPage.Signing)}
                                                        className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                                    >
                                                        Redeem
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {currentPage === RedeemPage.Signing && (
                                            <>
                                                <div className="flex flex-row justify-between">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-2xl font-semibold leading-6 text-gray-900"
                                                    ></Dialog.Title>
                                                    <button
                                                        className="mr-4 hover:opacity-90"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                </div>
                                                <div className="grid place-items-center gap-4 px-28 py-36">
                                                    <Image alt="Pen signing a paper" src={Pen} width={84} height={81} />
                                                    <span className="text-center text-title-1-size text-dark-text">
                                                        Sign to verify state change
                                                    </span>
                                                    <span className="text-center text-subtitle-size text-light-text">
                                                        Sign the message in your wallet to verify that want to redeem
                                                        your shirt.
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default RedeemModal;
