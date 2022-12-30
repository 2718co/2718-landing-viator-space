import Image from "next/image";
import MetamaskLogo from "./logos/metamask";
import WalletConnectLogo from "./logos/walletConnect";
import CoinbaseLogo from "../../../public/coinbaseCoinLogo.png";
import BraveLogo from "../../../public/braveLogo.png";

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
    label: "Manifesto",
    path: "/manifesto",
  },
  {
    label: "Gallery",
    path: "/gallery",
  },
  {
    label: "Domain",
    path: "/ens/claim",
  },
];

type AuthProvider = {
  name: string;
  icon: JSX.Element;
};

export type AuthProviders =
  | "metaMask"
  | "coinbaseWallet"
  | "walletConnect"
  | "injected";

export const PROVIDERS: Map<AuthProviders, AuthProvider> = new Map([
  [
    "metaMask",
    {
      name: "Metamask",
      icon: <MetamaskLogo />,
    },
  ],
  [
    "coinbaseWallet",
    {
      name: "Coinbase",
      icon: (
        <Image
          src={CoinbaseLogo}
          alt="Coinbase Logo"
          height={48}
          width={48}
          placeholder={"blur"}
        />
      ),
    },
  ],
  [
    "walletConnect",
    {
      name: "WalletConnect",
      icon: <WalletConnectLogo />,
    },
  ],
  [
    "injected",
    {
      name: "Browser Wallet",
      icon: (
        <Image
          src={BraveLogo}
          alt="Brave Logo"
          height={48}
          width={48}
          placeholder={"blur"}
        />
      ),
    },
  ],
]);
