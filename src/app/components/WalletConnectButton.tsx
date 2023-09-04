'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { clsx } from 'clsx';
import React from 'react';

interface IWalletConnectButtonProps {
    className?: string;
}

const WalletConnectButton = (props: IWalletConnectButtonProps): JSX.Element => {

    return (
        <div className={clsx('mono rounded-2xl border-2 border-highlight px-8 py-4 font-mono text-2xl tracking-wide justify-center flex', props.className)}>
            <ConnectButton />
        </div> 
    );
};

export default WalletConnectButton;

