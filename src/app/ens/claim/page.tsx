'use client';

import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import { ClaimProcess } from '../../../types';
import { classNames } from '../../../utils/classnames';
import { ClaimSubdomain, SaveSubdomain, SetAddrSubdomain, SetNameSubdomain, UserDomains } from '../../components';

const ClaimPage = () => {
    const [currentClaimPage, setCurrentClaimPage] = useState(ClaimProcess.Claim);
    const [subdomain, setSubdomain] = useState('');
    const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 0 for 'Claim', 1 for 'Your Domains'

    return (
        <div className="grid place-items-center pb-72 pt-40">
            <div className="max-w-2xl">
                <Tab.Group selectedIndex={selectedTabIndex}>
                    <Tab.List className="flex space-x-1 rounded-full bg-light-background p-2 mx-2 max-w-90vw">
                        {['Claim', 'Your Domains'].map((category, i) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full flex-1 whitespace-nowrap rounded-full py-2 text-title-2-size font-bold leading-6 text-dark-text',
                                        'mono ring-highlight ring-opacity-60 ring-offset-2 ring-offset-highlight focus:outline-none focus:ring-2',
                                        selected ? 'bg-highlight' : 'hover:bg-highlight/[0.12]'
                                    )
                                }
                                onClick={() => setSelectedTabIndex(i)}
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel
                            className={classNames(
                                'flex min-h-96 md:min-w-656 mx-2 max-w-90vw flex-col justify-center rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            {currentClaimPage === ClaimProcess.Claim && (
                                <ClaimSubdomain setSubdomain={setSubdomain} setCurrentClaimPage={setCurrentClaimPage} />
                            )}
                            {currentClaimPage === ClaimProcess.Save && (
                                <SaveSubdomain subdomain={subdomain} setCurrentClaimPage={setCurrentClaimPage} />
                            )}
                            {currentClaimPage === ClaimProcess.SetAddr && (
                                <SetAddrSubdomain subdomain={subdomain} setCurrentClaimPage={setCurrentClaimPage} />
                            )}
                            {currentClaimPage === ClaimProcess.SetName && (
                                <SetNameSubdomain subdomain={subdomain} setCurrentClaimPage={setCurrentClaimPage} />
                            )}
                        </Tab.Panel>
                        <Tab.Panel
                            className={classNames(
                                'flex h-96 mx-2 max-w-90vw flex-col rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            <UserDomains
                                setSubdomain={setSubdomain}
                                setCurrentClaimPage={setCurrentClaimPage}
                                setSelectedTabIndex={setSelectedTabIndex}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ClaimPage;
