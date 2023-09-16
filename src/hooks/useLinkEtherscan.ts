import { useNetwork } from 'wagmi';

interface EtherscanMap {
    [chainId: number]: string;
}

const etherscan = 'https://etherscan.io/tx/';

export function useLinkEtherscan(): string {
    const { chain } = useNetwork();

    const linkEtherscan: EtherscanMap = {
        1: etherscan,
        5: 'https://goerli.etherscan.io/tx/'
    };

    return chain?.id ? linkEtherscan[chain.id] : etherscan;
}
