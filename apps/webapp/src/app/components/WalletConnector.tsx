"use client";

import Image from "next/image";
import { useContext } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { AuthContext } from "../../client/wagmi";
import { formatAddress } from "../../utils/formatAddress";
import ExitIcon from "./ExitIcon";
import React from "react";
import BlockieIdenticon from "./BlockieIdenticon";

const WalletConnector = (): JSX.Element => {
  const { setModalOpen } = useContext(AuthContext);
  const { address, connector, isConnected, isConnecting } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });
  const { data: ensAvatar, isLoading: isEnsAvatarLoading } = useEnsAvatar({
    address,
  });
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
    address,
  });
  const { disconnect } = useDisconnect();

  return isConnected ? (
    <div className="group relative box-border inline-flex h-12 overflow-ellipsis whitespace-nowrap rounded-2xl bg-highlight bg-opacity-20 outline outline-2 outline-highlight">
      {/* Balance */}
      <span className="hidden items-center py-4 pl-4 text-highlight lg:flex">
        {!isBalanceLoading
          ? `${balance?.formatted} ${balance?.symbol}`
          : "Loading..."}
      </span>
      <div className="z-10 flex h-full w-min flex-row items-center space-x-7 rounded-2xl bg-black p-4 outline outline-2 outline-highlight lg:ml-4">
        {/* PP */}
        {!isEnsAvatarLoading ? (
          ensAvatar ? (
            <Image src={ensAvatar} alt="ENS Avatar" />
          ) : (
            <BlockieIdenticon
              address={address!}
              diameter={28}
              borderRadius={"28px"}
            />
          )
        ) : (
          <div className="h-7 w-7 rounded-full bg-green-500"></div>
        )}

        {/* Address */}
        <span className="w-[12ch] text-white">
          {!isEnsNameLoading
            ? ensName ?? (address && formatAddress(address))
            : "Loading..."}
        </span>
      </div>
      <button
        onClick={() => disconnect()}
        className="absolute top-4 right-0 z-0 flex w-full flex-row items-center justify-center space-x-4 rounded-b-lg bg-highlight px-5 text-black outline outline-2 outline-highlight transition-all hover:bg-hover-button hover:outline-hover-button group-hover:top-10 group-hover:pt-7 group-hover:pb-4 lg:w-min"
      >
        <span>Disconnect</span>
        <ExitIcon />
      </button>
    </div>
  ) : (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="mono rounded-2xl border-2 border-highlight py-4 px-8 font-mono text-2xl tracking-wide text-white hover:bg-hover-rectangle"
      >
        Connect Wallet
      </button>
    </>
  );
};

export default WalletConnector;
