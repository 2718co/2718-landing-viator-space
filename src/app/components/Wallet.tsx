'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { AppContext } from '../../contexts';
import { formatAddress, formatBalance, formatENSName } from '../../utils';
import BlockieIdenticon from './BlockieIdenticon';
import ExitIcon from './ExitIcon';
import { WalletConnectButton } from './WalletConnectButton';

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
    const { refreshWallet } = useContext(AppContext);
    const { address, isConnected } = useAccount();
    const { data: balance, isLoading: isBalanceLoading } = useBalance({ address: address });
    const { data: ensName, refetch } = useEnsName({ address, staleTime: 2_000 });
    const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({ name: ensName });
    const { disconnect } = useDisconnect();

    useEffect(() => {
        refetch();
    }, [refetch, refreshWallet]);

    return isConnected ? (
        <div className="group relative box-border inline-flex h-12 overflow-ellipsis whitespace-nowrap rounded-2xl bg-highlight bg-opacity-20 outline outline-2 outline-highlight">
            {/* Balance */}
            <span className="hidden items-center py-4 pl-4 text-highlight lg:flex">
                {!isBalanceLoading ? `${balance ? formatBalance(balance, 2) : 0} ${balance?.symbol}` : 'Loading...'}
            </span>
            <div className="z-10 flex h-full flex-row items-center w-fit rounded-2xl bg-black p-2 sm:p-4 outline outline-2 outline-highlight lg:ml-4">
                {!isEnsAvatarLoading ? (
                    ensAvatar ? (
                        <>
                            <Image
                                src={ensAvatar}
                                alt="ENS Avatar"
                                width="28"
                                height="28"
                                className="hidden sm:block rounded-full"
                            />
                            <Image
                                src={ensAvatar}
                                alt="ENS Avatar"
                                width="18"
                                height="18"
                                className="block sm:hidden rounded-full"
                            />
                        </>
                    ) : (
                        <>
                            <div className="block sm:hidden w-5">
                                <BlockieIdenticon address={address!} diameter={18} borderRadius={'18px'} />
                            </div>
                            <div className="hidden sm:block">
                                <BlockieIdenticon address={address!} diameter={28} borderRadius={'28px'} />
                            </div>
                        </>
                    )
                ) : (
                    <div className="h-7 w-7 rounded-full bg-green-500 m-0"></div>
                )}

                {ensName ? (
                    <>
                        <span className="text-xs sm:hidden min-w-[12ch] w-auto text-white ml-[8px]">
                            {formatENSName(ensName)}
                        </span>
                        <span className="hidden sm:block min-w-[12ch] w-auto text-white ml-[8px]">{ensName}</span>
                    </>
                ) : (
                    <>
                        <span className="text-xs sm:text-base min-w-[12ch] w-auto text-white ml-[8px]">
                            {address && formatAddress(address)}
                        </span>
                    </>
                )}
            </div>
            <button
                onClick={() => disconnect()}
                className="absolute right-0 top-4 z-0 flex w-fit flex-row items-center justify-center space-x-4 rounded-b-lg bg-highlight px-5 text-black outline outline-2 outline-highlight transition-all hover:bg-hover-button hover:outline-hover-button group-hover:top-10 group-hover:pb-4 group-hover:pt-7 lg:w-min"
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
