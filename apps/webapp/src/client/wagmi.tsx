"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useMemo, useState } from "react";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import AuthModal from "../app/components/AuthModal";

const defaultChains = [mainnet, goerli];
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  jsonRpcProvider({
    priority: 0,
    rpc: () => ({
      http: `http://127.0.0.1:8545`,
    }),
  }),
  //   alchemyProvider({ apiKey: "wXQX9hj8meuBws9Me9c3w93-_pvIcIoX" }),
  //   publicProvider(),
]);

// Set up client
const client = createClient({
  // autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

interface AuthContextInterface {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextInterface>(undefined!);

const WagmiProvider = (props: PropsWithChildren) => {
  const [modalOpen, setModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      modalOpen,
      setModalOpen,
    }),
    [modalOpen]
  );

  return (
    <AuthContext.Provider value={value}>
      <WagmiConfig client={client}>
        {props.children}
        <AuthModal open={modalOpen} setOpen={setModalOpen} />
      </WagmiConfig>
    </AuthContext.Provider>
  );
};

export default WagmiProvider;
