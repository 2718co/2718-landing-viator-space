export const formatAddress = (address: `0x${string}`): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
