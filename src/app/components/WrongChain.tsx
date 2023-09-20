'use client';

import { useChainModal } from '@rainbow-me/rainbowkit';
import { clsx } from 'clsx';
import React from 'react';

interface IWalletConnectButtonProps {
    className?: string;
    overrideStyles?: string;
}

export const WrongChain = ({ className, overrideStyles = 'px-8 py-4' }: IWalletConnectButtonProps): JSX.Element => {
    const { openChainModal } = useChainModal();

    if (!openChainModal) {
        return <></>;
    }

    return (
        <button
            onClick={openChainModal}
            type="button"
            className={clsx(
                'mono rounded-2xl border-2 bg-red-500 font-mono text-2xl tracking-wide justify-center flex hover:bg-red-600',
                overrideStyles,
                className
            )}
        >
            Wrong Network
        </button>
    );
};
