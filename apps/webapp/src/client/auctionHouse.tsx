"use client";

import { ethers } from "ethers";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";
import { C2718_AUCTION_HOUSE_CONTRACT_ADDRESS } from "../../constants";
import { C2718AuctionHouse__factory } from "../generated/contract-types";

interface AuctionHouseInterface {
  contractAddress: string;
}

export const AuctionHouseContext = createContext<AuctionHouseInterface>(
  undefined!
);

const contract = C2718AuctionHouse__factory.connect(
  C2718_AUCTION_HOUSE_CONTRACT_ADDRESS,
  ethers.getDefaultProvider()
);

const AuctionHouseProvider = (props: PropsWithChildren) => {
  const value = useMemo(
    () => ({
      contractAddress: C2718_AUCTION_HOUSE_CONTRACT_ADDRESS,
    }),
    []
  );

  return (
    <AuctionHouseContext.Provider value={value}>
      {props.children}
    </AuctionHouseContext.Provider>
  );
};

export const useAuctionHouse = () => {
  //   const auctionHouse = useContext(AuctionHouseContext);

  const placeBid = async (amount: string) => {
    const { planetId } = await contract.auction();
    const options = { value: ethers.utils.parseEther(`${amount}`) };
    await contract.createBid(planetId, options);
  };
  const settleAuction = () => ({});

  return {
    placeBid,
  };
};

export default AuctionHouseProvider;
