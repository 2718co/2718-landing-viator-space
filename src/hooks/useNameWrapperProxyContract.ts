import { useNetwork } from 'wagmi';

interface NameWrapperProxyMap {
    [chainId: number]: string;
}

export function useNameWrapperProxyContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const nameWrapperProxyContract: NameWrapperProxyMap = {
        5: '0x96f88d45a64470e9a4d990cef6dd6943de131431'
    };

    const contractAddress = chain?.id ? nameWrapperProxyContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}