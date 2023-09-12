import { useNetwork } from 'wagmi';

interface PublicResolverMap {
    [chainId: number]: string;
}

export function usePublicResolverContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const publicResolverContract: PublicResolverMap = {
        1: '0x231b0ee14048e9dccd1d247744d114a4eb5e8e63',
        5: '0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750'
    };

    const contractAddress = chain?.id ? publicResolverContract[chain.id] : undefined;

    return contractAddress ? (contractAddress as `0x${string}`) : undefined;
}
