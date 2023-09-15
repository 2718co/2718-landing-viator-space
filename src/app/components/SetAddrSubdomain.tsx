'use client';

import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';
import { useDomain, usePublicResolverContract } from '../../hooks';
import PublicResolverABI from '../../shared/abi/PublicResolver.json';
import { ClaimProcess, ClaimSubdomainProps } from '../../types';
import { formatAddress, getNode, getParentNode } from '../../utils';
import { Loading } from '../components';

export const SetAddrSubdomain = ({ subdomain = '', setCurrentClaimPage }: ClaimSubdomainProps) => {
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();
    const publicResolverContract = usePublicResolverContract();
    const domain = useDomain();
    const parentNode = getParentNode(domain) as `0x${string}`;
    const node = getNode(subdomain, parentNode);

    const { writeAsync } = useContractWrite({
        address: publicResolverContract,
        abi: PublicResolverABI,
        functionName: 'setAddr',
        args: [node, address]
    });

    async function setAddr() {
        setLoading(true);
        const tx = await writeAsync();
        await waitForTransaction({ hash: tx.hash });
        setCurrentClaimPage(ClaimProcess.SetName);
        setLoading(false);
    }

    return (
        <div className="flex flex-1 flex-col justify-between space-y-3">
            <div className="">
                <h1 className="text-title-1-size text-dark-text">
                    {!loading ? 'Confirm Details' : 'Waiting for your transaction'}
                </h1>
                {!loading && (
                    <span className="text-text-size text-light-text">
                        Double check these details before confirming in your wallet.
                    </span>
                )}
            </div>
            {loading ? (
                <Loading width="w-16" />
            ) : (
                <>
                    <div className="flex text-text-size sm:text-base flex-row justify-between space-x-3 rounded-xl bg-white px-4 py-6 font-semibold text-dark-text">
                        <span className="text-light-text font-normal">Name</span>
                        <span className="text-right">{subdomain}</span>
                    </div>
                    <div className="flex text-text-size sm:text-base flex-row justify-between space-x-3 rounded-xl bg-white px-4 py-6 font-semibold text-dark-text">
                        <span className="text-light-text font-normal">Info</span>
                        <span className="text-right">Update ETH address to this address</span>
                    </div>
                    <div className="flex text-text-size sm:text-base flex-row justify-between space-x-3 rounded-xl bg-white px-4 py-6 font-semibold text-dark-text">
                        <span className="text-light-text font-normal">Address</span>
                        <span className="text-right">{address && formatAddress(address)}</span>
                    </div>
                    <div className="grid grid-flow-col gap-5">
                        <button
                            onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                            className="h-full w-full rounded-2xl border-2 border-highlight py-4 font-mono text-base md:text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={setAddr}
                            className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-base md:text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                        >
                            Open Wallet
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
