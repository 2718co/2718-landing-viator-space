import BraveLogo from './logos/brave';
import CoinbaseLogo from './logos/coinbase';
import MetamaskLogo from './logos/metamask';
import WalletConnectLogo from './logos/walletConnect';

export type NavLink = {
    label: string;
    path: string;
};

export const navlinks: NavLink[] = [
    // {
    //   label: "Home",
    //   path: "/",
    // },
    {
        label: 'Manifesto',
        path: '/manifesto'
    },
    {
        label: 'Gallery',
        path: '/gallery'
    },
    {
        label: 'Domain',
        path: '/ens/claim'
    }
];

type AuthProvider = {
    name: string;
    icon: JSX.Element;
};

export type AuthProviders = 'metaMask' | 'coinbaseWallet' | 'walletConnect' | 'injected';

export const PROVIDERS: Map<AuthProviders, AuthProvider> = new Map([
    [
        'metaMask',
        {
            name: 'Metamask',
            icon: <MetamaskLogo />
        }
    ],
    [
        'coinbaseWallet',
        {
            name: 'Coinbase',
            icon: <CoinbaseLogo />
        }
    ],
    [
        'walletConnect',
        {
            name: 'WalletConnect',
            icon: <WalletConnectLogo />
        }
    ],
    [
        'injected',
        {
            name: 'Browser Wallet',
            icon: <BraveLogo />
        }
    ]
]);
