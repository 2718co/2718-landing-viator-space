import Image from 'next/image';
import React from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { useGetUserDomains } from '../../hooks';
import { ClaimProcess, ClaimSubdomainProps } from '../../types';
import { WalletConnectButton } from '../components';

type WrappedDomainItem = {
    expiryDate: string;
    fuses: number;
    domain: {
        id: string;
        labelName: string;
        labelhash: string;
        name: string;
        isMigrated: boolean;
        parent: {
            name: string;
            id: string;
        };
        createdAt: string;
        registration: {
            registrationDate: string;
            expiryDate: string;
        };
    };
};

export const UserDomains = ({ setCurrentClaimPage, setSubdomain, setSelectedTabIndex }: ClaimSubdomainProps) => {
    const { data } = useGetUserDomains();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });

    function setPrimaryName(name: string) {
        setSelectedTabIndex?.(0);
        setSubdomain?.(name);
        setCurrentClaimPage(ClaimProcess.SetAddr);
    }

    return (
        <>
            <span className="text-text-size text-light-text">
                Select a domain to make it your primary ENS name to be used across major web3 platforms.
            </span>
            <ul className="hide-scrollbar mt-3 flex flex-auto scroll-mb-8 list-none flex-col space-y-3 overflow-y-scroll overflow-x-hidden">
                {data?.account?.wrappedDomains.map((item: WrappedDomainItem, i: number) => {
                    const { name, labelName } = item.domain;
                    return (
                        <li key={i}>
                            <button
                                className="mono w-full rounded-2xl bg-white px-4 py-6 text-left text-base md:text-button-text-size text-dark-text overflow-x-hidden"
                                onClick={() => ensName !== name && setPrimaryName(labelName)}
                            >
                                {ensName === name && (
                                    <Image
                                        alt="Verified badge"
                                        src="/verified.svg"
                                        width="20"
                                        height="20"
                                        className="inline mr-2 h-auto"
                                    />
                                )}
                                {name}
                            </button>
                        </li>
                    );
                })}
            </ul>
            {!isConnected && <WalletConnectButton className="bg-highlight text-dark-text w-full" />}
        </>
    );
};
