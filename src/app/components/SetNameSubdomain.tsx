'use client';

import React, { useContext, useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';
import { AppContext } from '../../contexts';
import { useDomain, useReverseRegistrarContract } from '../../hooks';
import ReverseRegistrarABI from '../../shared/abi/ReverseRegistrar.json';
import { ClaimProcess, ClaimSubdomainProps } from '../../types';
import { formatAddress } from '../../utils';
import { Loading } from '../components';

export const SetNameSubdomain = ({ subdomain = '', setCurrentClaimPage }: ClaimSubdomainProps) => {
    const [loading, setLoading] = useState(false);
    const { refreshWallet, setRefreshWallet } = useContext(AppContext);
    const { address } = useAccount();
    const reverseRegistrarContrac = useReverseRegistrarContract();
    const domain = useDomain();

    const { writeAsync } = useContractWrite({
        address: reverseRegistrarContrac,
        abi: ReverseRegistrarABI,
        functionName: 'setName',
        args: [`${subdomain}.${domain}.eth`]
    });

    async function setName() {
        setLoading(true);
        const tx = await writeAsync();
        await waitForTransaction({ hash: tx.hash });
        setCurrentClaimPage(ClaimProcess.Claim);
        setLoading(false);
        setRefreshWallet(!refreshWallet);
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
                        <span className="text-right">Set the primary name for your address</span>
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
                            onClick={setName}
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
