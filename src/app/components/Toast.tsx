'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment, useContext, useEffect } from 'react';
import { AppContext } from '../../contexts';
import { useLinkEtherscan } from '../../hooks';

export const Toast = () => {
    const { toast, setToast } = useContext(AppContext);
    const linkEtherscan = useLinkEtherscan();

    useEffect(() => {
        if ((toast?.message?.length || 0) > 0) {
            const timer = setTimeout(() => setToast(null), 6000);

            // Only update the state if the component is still mounted
            return () => clearTimeout(timer);
        }
    }, [toast?.message, setToast]);

    function closeModal() {
        setToast(null);
    }

    function viewEtherscan() {
        window.open(`${linkEtherscan}${toast?.txHash}`, '_blank');
        setToast(null);
    }

    if (!toast) {
        return null;
    }

    return (
        <Transition appear show={toast?.message.length > 0} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-80 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all absolute right-40 top-40">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-black">
                                    Transaction successful
                                </Dialog.Title>
                                <button onClick={closeModal} className="absolute top-6 right-6">
                                    <Image src="/close-icon.png" alt="Close modal" height="12" width="12" />
                                </button>
                                <div className="mt-2">
                                    <p className="text-text-size text-light-text">{toast?.message}</p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={viewEtherscan}
                                        type="button"
                                        className="mono h-full w-full rounded-2xl bg-highlight py-4 font-mono text-text-sizee font-semibold text-dark-text hover:bg-hover-button"
                                    >
                                        View on Etherscan
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
