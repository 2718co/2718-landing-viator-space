'use client';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { clsx } from 'clsx';
import React from 'react';
interface IWalletConnectButtonProps {
    className?: string;
}

export const WalletConnectButton = (props: IWalletConnectButtonProps): JSX.Element => {
    const { openConnectModal } = useConnectModal();

    if (!openConnectModal) {
        return <></>;
    }

    return (
        <button
            onClick={openConnectModal}
            type="button"
            className={clsx(
                'mono rounded-2xl border-2 border-highlight px-8 py-4 font-mono text-2xl tracking-wide justify-center flex hover:bg-hover-rectangle',
                props.className
            )}
        >
            Connect Wallet
        </button>
    );
};
