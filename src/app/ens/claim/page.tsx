'use client';

import { Tab } from '@headlessui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { ClaimProcess } from '../../../types';
import { classNames } from '../../../utils/classnames';
import { ClaimSubdomain } from '../../components';
import Verified from './assets/Verified.svg';

const ClaimPage = () => {
    const [currentClaimPage, setCurrentClaimPage] = useState(ClaimProcess.Claim);

    return (
        <div className="grid place-items-center pb-72 pt-40">
            <div className="max-w-2xl">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-full bg-light-background p-2">
                        {['Claim', 'Your Domains'].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full flex-1 whitespace-nowrap rounded-full py-2 text-title-2-size font-bold leading-6 text-dark-text',
                                        'mono ring-highlight ring-opacity-60 ring-offset-2 ring-offset-highlight focus:outline-none focus:ring-2',
                                        selected ? 'bg-highlight' : 'hover:bg-highlight/[0.12]'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={classNames(
                                'flex h-96 w-full flex-col rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            <div className="relative mb-6 h-10 w-full">
                                {/* Bg line */}
                                <div className="absolute inset-x-0 top-1/2 h-[5px] w-full rounded-full bg-highlight">
                                    {/* Steps */}
                                    <div className="absolute inset-0 -top-1.5 flex w-full flex-row items-start justify-between">
                                        <div className="relative">
                                            <div className="grid h-4 w-4 place-items-center rounded-full bg-highlight"></div>
                                            <div className="absolute -top-5 left-0 text-subtitle-2-size text-highlight">
                                                Claim
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="grid h-4 w-4 place-items-center rounded-full bg-highlight">
                                                {currentClaimPage < ClaimProcess.Wait && (
                                                    <div className="h-2 w-2 rounded-full bg-light-background transition-opacity"></div>
                                                )}
                                            </div>
                                            <div className="absolute -top-5 text-subtitle-2-size text-highlight">
                                                Wait
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="grid h-4 w-4 place-items-center rounded-full bg-highlight">
                                                {currentClaimPage < ClaimProcess.Register && (
                                                    <div className="h-2 w-2 rounded-full bg-light-background"></div>
                                                )}
                                            </div>
                                            <div className="absolute -top-5 right-0 text-subtitle-2-size text-highlight">
                                                Register
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {currentClaimPage === ClaimProcess.Claim && (
                                <ClaimSubdomain setCurrentClaimPage={setCurrentClaimPage} />
                            )}
                            {currentClaimPage === ClaimProcess.Wait && (
                                <div className="flex flex-1 flex-col justify-between space-y-3">
                                    <div className="">
                                        <h1 className="text-title-1-size text-dark-text">2. Wait for 1 min</h1>
                                        <span className="text-text-size text-light-text">
                                            Hang on for one minute while we ensure no other person has tried to register
                                            the same name and while we try to reserve your claim.
                                        </span>
                                    </div>
                                    <div className="">
                                        <button
                                            onClick={() => setCurrentClaimPage(ClaimProcess.Register)}
                                            className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Wait
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentClaimPage === ClaimProcess.Register && (
                                <div className="flex flex-1 flex-col justify-between space-y-3">
                                    <div className="">
                                        <h1 className="text-title-1-size text-dark-text">
                                            3. Let&apos;s make it official
                                        </h1>
                                        <span className="text-text-size text-light-text">
                                            Sign the second and last transaction to register and make the domain name
                                            yours.{' '}
                                        </span>
                                    </div>
                                    <div className="rounded-xl bg-white px-4 py-6 text-button-text-size font-semibold text-dark-text">
                                        aero.2718.eth
                                    </div>
                                    <div className="">
                                        <button
                                            onClick={() => setCurrentClaimPage(ClaimProcess.Save)}
                                            className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentClaimPage === ClaimProcess.Save && (
                                <div className="flex flex-1 flex-col justify-between space-y-3">
                                    <div className="">
                                        <h1 className="text-title-1-size text-dark-text">Welcome, Aero</h1>
                                        <span className="text-text-size text-light-text">
                                            Save your new ENS domain as your primary ENS name to represent your Ethereum
                                            account and act as your cross-platform web3 username and profile. You can
                                            only have one primary ENS name. With this action any previous name is
                                            overwritten.
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 rounded-xl bg-white px-4 py-6 text-button-text-size font-semibold text-dark-text">
                                        <Image alt="Verified badge" src={Verified} width={20} height={20} />
                                        <span>aero.2718.eth</span>
                                    </div>
                                    <div className="grid grid-flow-col gap-5">
                                        <button
                                            onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                                            className="h-full w-full rounded-2xl border-2 border-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                                            className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'flex h-96 flex-col rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            <span className="text-text-size text-light-text">
                                Select a domain to make it your primary ENS name to be used across major web3 platforms.
                            </span>

                            <ul className="hide-scrollbar mt-3 flex flex-auto scroll-mb-8 list-none flex-col space-y-3 overflow-scroll">
                                {Array(7)
                                    .fill(0)
                                    .map((item) => (
                                        <li key={item}>
                                            <button className="mono w-full rounded-2xl bg-white px-4 py-6 text-left text-button-text-size text-dark-text">
                                                areo.2718.eth
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ClaimPage;
