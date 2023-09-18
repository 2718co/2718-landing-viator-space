import Image from 'next/image';
import React from 'react';
import { useAccount, useEnsName, usePublicClient } from 'wagmi';
import { useGetUserDomains, usePublicResolverContract } from '../../hooks';
import PublicResolverABI from '../../shared/abi/PublicResolver.json';
import { ClaimProcess, ClaimSubdomainProps, subdomainObj } from '../../types';
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
    parent: {
        id: string;
        name: string;
    };
};

export const UserDomains = ({ setCurrentClaimPage, setSubdomain, setSelectedTabIndex }: ClaimSubdomainProps) => {
    const publicClient = usePublicClient();
    const { data } = useGetUserDomains();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const publicResolverContract = usePublicResolverContract();

    async function setPrimaryName(subdomain: subdomainObj) {
        const data = await publicClient.readContract({
            address: publicResolverContract as `0x${string}`,
            abi: PublicResolverABI,
            functionName: 'addr',
            args: [subdomain?.node]
        });
        setSelectedTabIndex?.(0);
        setSubdomain?.(subdomain);
        setCurrentClaimPage(data === address ? ClaimProcess.SetName : ClaimProcess.TwoSteps);
    }

    return (
        <>
            <span className="text-text-size text-light-text">
                Select a domain to make it your primary ENS name to be used across major web3 platforms.
            </span>
            <ul className="hide-scrollbar mt-3 flex flex-auto scroll-mb-8 list-none flex-col space-y-3 overflow-y-scroll overflow-x-hidden">
                {data?.account?.wrappedDomains.map((item: WrappedDomainItem, i: number) => {
                    const { name, labelName, id } = item.domain;
                    return (
                        <li key={i}>
                            <button
                                className="mono w-full rounded-2xl bg-white px-4 py-6 text-left text-base md:text-button-text-size text-dark-text overflow-x-hidden"
                                onClick={() =>
                                    ensName !== name &&
                                    setPrimaryName({
                                        name,
                                        label: labelName,
                                        parentNode: item?.parent?.id,
                                        node: id
                                    })
                                }
                            >
                                {ensName === name && (
                                    <Image
                                        alt="Verified badge"
                                        src="/verified-icon.svg"
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
