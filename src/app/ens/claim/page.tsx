'use client';

import { Tab } from '@headlessui/react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';
import { AppContext } from '../../../contexts';
import { useDomain, usePublicResolverContract, useReverseRegistrarContract } from '../../../hooks';
import PublicResolverABI from '../../../shared/abi/PublicResolver.json';
import ReverseRegistrarABI from '../../../shared/abi/ReverseRegistrar.json';
import { ClaimProcess } from '../../../types';
import { getNode, getParentNode } from '../../../utils';
import { classNames } from '../../../utils/classnames';
import Verified from '../../assets/Verified.svg';
import { ClaimSubdomain, Loading, UserDomains } from '../../components';

const ClaimPage = () => {
    const [loading, setLoading] = useState(false);
    const { refreshWallet, setRefreshWallet } = useContext(AppContext);
    const { address } = useAccount();
    const [currentClaimPage, setCurrentClaimPage] = useState(ClaimProcess.Claim);
    const [claimedSubdomain, setClaimedSubdomain] = useState('');
    const publicResolverContract = usePublicResolverContract();
    const reverseRegistrarContrac = useReverseRegistrarContract();
    const domain = useDomain();
    const parentNode = getParentNode(domain) as `0x${string}`;
    const node = getNode(claimedSubdomain, parentNode);

    const { writeAsync: setAddr } = useContractWrite({
        address: publicResolverContract,
        abi: PublicResolverABI,
        functionName: 'setAddr',
        args: [node, address]
    });

    const { writeAsync: setName } = useContractWrite({
        address: reverseRegistrarContrac,
        abi: ReverseRegistrarABI,
        functionName: 'setName',
        args: [`${claimedSubdomain}.${domain}.eth`]
    });

    async function setPrimaryName() {
        setLoading(true);
        const txSetAddr = await setAddr();
        await waitForTransaction({ hash: txSetAddr.hash });
        const txSetName = await setName();
        await waitForTransaction({ hash: txSetName.hash });
        setCurrentClaimPage(ClaimProcess.Claim);
        setLoading(false);
        setRefreshWallet(!refreshWallet);
    }

    return (
        <div className="grid place-items-center pb-72 pt-40">
            <div className="max-w-2xl">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-full bg-light-background p-2 mx-2 max-w-90vw">
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
                                'flex h-96 mx-2 max-w-90vw flex-col justify-center rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            {currentClaimPage === ClaimProcess.Claim && (
                                <ClaimSubdomain
                                    setClaimedSubdomain={setClaimedSubdomain}
                                    setCurrentClaimPage={setCurrentClaimPage}
                                />
                            )}
                            {currentClaimPage === ClaimProcess.Save && (
                                <div className="flex flex-1 flex-col justify-between space-y-3">
                                    <div className="">
                                        <h1 className="text-title-1-size text-dark-text">
                                            Welcome, {claimedSubdomain}
                                        </h1>
                                        <span className="text-text-size text-light-text">
                                            Save your new ENS domain as your primary ENS name to represent your Ethereum
                                            account and act as your cross-platform web3 username and profile. You can
                                            only have one primary ENS name. With this action any previous name is
                                            overwritten.
                                        </span>
                                    </div>
                                    <div className="flex flex-row space-x-3 rounded-xl bg-white px-4 py-6 text-button-text-size font-semibold text-dark-text">
                                        <Image alt="Verified badge" src={Verified} width={20} className="h-auto" />
                                        <span>{claimedSubdomain}.2718.eth</span>
                                    </div>
                                    {loading && <Loading width="w-16" />}
                                    <div className="grid grid-flow-col gap-5">
                                        <button
                                            onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                                            className="h-full w-full rounded-2xl border-2 border-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setPrimaryName()}
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
                                'flex h-96 mx-2 max-w-90vw flex-col rounded-3xl bg-light-background p-7',
                                'focus:outline-none'
                            )}
                        >
                            <UserDomains />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ClaimPage;
