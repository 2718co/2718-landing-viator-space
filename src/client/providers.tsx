'use client';

import { RainbowKitProvider, Theme, connectorsForWallets, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import { argentWallet, ledgerWallet, trustWallet, } from '@rainbow-me/rainbowkit/wallets';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import merge from 'lodash.merge';
import * as React from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const { wallets } = getDefaultWallets({
    appName: '2718 Collective',
    projectId,
    chains,
});

const appInfo = {
    appName: '2718 Collective',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

const rainbowTheme = merge(
    lightTheme(), {
        colors: {
            accentColor: 'inherit',
            accentColorForeground: 'inherit',
            modalBackground: '#EAEAEA'
        },
        fonts: {
            body: 'var(--font-abc)'
        },
        shadows: {
            connectButton: 'none'
        },        
    } as Theme);


export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider 
                appInfo={appInfo}
                chains={chains} 
                theme={rainbowTheme}
            >
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
