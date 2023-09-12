'use client';

import Image from 'next/image';
import React from 'react';
import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { formatBalance } from '../../utils';
import { formatAddress } from '../../utils/formatAddress';
import BlockieIdenticon from './BlockieIdenticon';
import ExitIcon from './ExitIcon';
import { WalletConnectButton } from './WalletConnectButton';

const Wallet = (): JSX.Element => {
    const { address, isConnected } = useAccount();
    const { data: balance, isLoading: isBalanceLoading } = useBalance({ address: address });
    const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({ address });
    const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({ name: ensName });
    const { disconnect } = useDisconnect();

    return isConnected ? (
        <div className="group relative box-border inline-flex h-12 overflow-ellipsis whitespace-nowrap rounded-2xl bg-highlight bg-opacity-20 outline outline-2 outline-highlight">
            {/* Balance */}
            <span className="hidden items-center py-4 pl-4 text-highlight lg:flex">
                {!isBalanceLoading ? `${balance ? formatBalance(balance, 2) : 0} ${balance?.symbol}` : 'Loading...'}
            </span>
            <div className="z-10 flex h-full flex-row items-center w-fit rounded-2xl bg-black p-4 outline outline-2 outline-highlight lg:ml-4">
                {!isEnsAvatarLoading ? (
                    ensAvatar ? (
                        <Image src={ensAvatar} alt="ENS Avatar" width="28" height="28" className="rounded-full" />
                    ) : (
                        <BlockieIdenticon address={address!} diameter={28} borderRadius={'28px'} />
                    )
                ) : (
                    <div className="h-7 w-7 rounded-full bg-green-500 m-0"></div>
                )}

                {/* Address */}
                <span className="min-w-[12ch] w-auto text-white ml-[8px]">
                    {!isEnsNameLoading ? ensName ?? (address && formatAddress(address)) : 'Loading...'}
                </span>
            </div>
            <button
                onClick={() => disconnect()}
                className="absolute right-0 top-4 z-0 flex w-fit flex-row items-center justify-center space-x-4 rounded-b-lg bg-highlight px-5 text-black outline outline-2 outline-highlight transition-all hover:bg-hover-button hover:outline-hover-button group-hover:top-10 group-hover:pb-4 group-hover:pt-7 lg:w-min"
            >
                <span>Disconnect</span>
                <ExitIcon />
            </button>
        </div>
    ) : (
        <WalletConnectButton className="text-white" />
    );
};

export default Wallet;
