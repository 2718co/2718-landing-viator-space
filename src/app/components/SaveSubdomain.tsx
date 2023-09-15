import Image from 'next/image';
import { ClaimProcess, ClaimSubdomainProps } from '../../types';

export const SaveSubdomain = ({ subdomain, setCurrentClaimPage }: ClaimSubdomainProps) => {
    return (
        <div className="flex flex-1 flex-col justify-between space-y-3">
            <div className="">
                <h1 className="text-title-1-size text-dark-text">Welcome, {subdomain}</h1>
                <span className="text-text-size text-light-text">
                    Save your new ENS domain as your primary ENS name to represent your Ethereum account and act as your
                    cross-platform web3 username and profile. You can only have one primary ENS name. With this action
                    any previous name is overwritten.
                </span>
            </div>
            <div className="flex flex-row space-x-3 rounded-xl bg-white px-4 py-6 text-button-text-size font-semibold text-dark-text">
                <Image alt="Verified badge" src="/verified.svg" width="20" height="20" className="h-auto" />
                <span>{subdomain}.2718.eth</span>
            </div>
            <div className="grid grid-flow-col gap-5">
                <button
                    onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                    className="h-full w-full rounded-2xl border-2 border-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setCurrentClaimPage(ClaimProcess.SetAddr)}
                    className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                >
                    Save
                </button>
            </div>
        </div>
    );
};
