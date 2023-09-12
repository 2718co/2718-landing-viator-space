import { useNetwork } from 'wagmi';

interface ReverseRegistrarMap {
    [chainId: number]: string;
}

export function useReverseRegistrarContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const publicResolverContract: ReverseRegistrarMap = {
        1: '0xa58e81fe9b61b5c3fe2afd33cf304c454abfc7cb',
        5: '0x4f7A657451358a22dc397d5eE7981FfC526cd856'
    };

    const contractAddress = chain?.id ? publicResolverContract[chain.id] : undefined;

    return contractAddress ? (contractAddress as `0x${string}`) : undefined;
}
