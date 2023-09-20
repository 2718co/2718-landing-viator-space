'use client';

import { clsx } from 'clsx';
import { useAccount, useDisconnect } from 'wagmi';
import { WalletConnectButton, WalletDetails } from '../components';
import ExitIcon from './ExitIcon';

interface IWalletConnectButtonProps {
    className?: string;
    connectText?: string;
    overrideStyles?: string;
}

const Wallet = ({
    connectText = 'Connect Wallet',
    className,
    overrideStyles
}: IWalletConnectButtonProps): JSX.Element => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return isConnected && address ? (
        <div className="group relative box-border inline-flex h-12 overflow-ellipsis whitespace-nowrap rounded-2xl bg-highlight bg-opacity-20 outline outline-2 outline-highlight">
            <WalletDetails />
            <button
                onClick={() => disconnect()}
                className="absolute right-0 top-3 z-0 flex w-fit flex-row items-center justify-center space-x-4 rounded-b-lg bg-highlight px-5 text-black outline outline-2 outline-transparent transition-all group-hover:outline-highlight hover:bg-hover-button hover:outline-hover-button group-hover:top-8 group-hover:pb-4 group-hover:pt-7 lg:w-min"
            >
                <span className="hidden sm:block">Disconnect</span>
                <ExitIcon />
            </button>
        </div>
    ) : (
        <WalletConnectButton
            className={clsx('text-white', className)}
            connectText={connectText}
            overrideStyles={overrideStyles}
        />
    );
};

export default Wallet;
