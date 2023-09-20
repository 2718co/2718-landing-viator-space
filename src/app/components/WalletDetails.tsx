'use client';

import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { useAccount, useBalance, useEnsAvatar, useEnsName } from 'wagmi';
import { AppContext } from '../../contexts';
import { formatAddress, formatBalance, formatENSName } from '../../utils';
import BlockieIdenticon from './BlockieIdenticon';

export const WalletDetails = (): JSX.Element => {
    const { refreshWallet } = useContext(AppContext);
    const { address } = useAccount();
    const { data: balance, isLoading: isBalanceLoading } = useBalance({ address: address });
    const { data: ensName, refetch } = useEnsName({ address: address, staleTime: 2_000 });
    const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({ name: ensName });

    useEffect(() => {
        refetch();
    }, [refetch, refreshWallet]);

    return (
        <>
            {/* Balance */}
            <span className="hidden items-center py-4 pl-4 text-highlight lg:flex">
                {!isBalanceLoading ? `${balance ? formatBalance(balance, 2) : 0} ${balance?.symbol}` : 'Loading...'}
            </span>
            <div className="z-10 flex h-full flex-row items-center w-fit rounded-2xl bg-dark-background p-2 sm:p-4 outline outline-2 outline-highlight lg:ml-4">
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
        </>
    );
};
