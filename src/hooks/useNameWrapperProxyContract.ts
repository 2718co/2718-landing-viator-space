import { useNetwork } from 'wagmi';

interface TesseractProxyContractMap {
    [chainId: number]: string;
}

export function useNameWrapperProxyContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const tesseractProxyContract: TesseractProxyContractMap = {
        5: '0x316B0060675360950D04CA128296a40A29f4e607'
    };

    const contractAddress = chain?.id ? tesseractProxyContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}