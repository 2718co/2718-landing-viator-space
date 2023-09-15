import { ClaimProcess, ClaimSubdomainProps } from '../../types';

export const SubdomainTwoSteps = ({ setCurrentClaimPage }: ClaimSubdomainProps) => {
    return (
        <div className="flex flex-1 flex-col justify-between space-y-3">
            <div className="">
                <h1 className="text-title-1-size text-dark-text">Update ETH address</h1>
                <span className="text-text-size text-light-text">
                    The ETH address for this name doesn&apos;t match this wallet. To use this as your primary name you
                    will need to update the ETH address first.
                </span>
            </div>
            <div className="flex text-text-size sm:text-base flex-row justify-between space-x-3 rounded-xl bg-white px-4 py-6 font-semibold text-dark-text">
                <span className="text-light-text font-normal">Step 1</span>
                <span className="text-right">Update ETH address</span>
            </div>
            <div className="flex text-text-size sm:text-base flex-row justify-between space-x-3 rounded-xl bg-white px-4 py-6 font-semibold text-dark-text">
                <span className="text-light-text font-normal">Step</span>
                <span className="text-right">Set primary name</span>
            </div>
            <div className="grid grid-flow-col gap-5">
                <button
                    onClick={() => setCurrentClaimPage(ClaimProcess.Claim)}
                    className="h-full w-full rounded-2xl border-2 border-highlight py-4 font-mono text-base md:text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                >
                    Cancel
                </button>
                <button
                    onClick={() => setCurrentClaimPage(ClaimProcess.SetAddr)}
                    className="h-full w-full rounded-2xl bg-highlight py-4 font-mono text-base md:text-button-text-size font-semibold text-dark-text hover:bg-hover-button"
                >
                    Start
                </button>
            </div>
        </div>
    );
};
