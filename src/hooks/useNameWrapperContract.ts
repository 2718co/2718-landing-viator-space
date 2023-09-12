import { useNetwork } from 'wagmi';

interface NameWrapperMap {
    [chainId: number]: string;
}

export function useNameWrapperContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const nameWrapperContract: NameWrapperMap = {
        1: '0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401',
        5: '0x114D4603199df73e7D157787f8778E21fCd13066'
    };

    const contractAddress = chain?.id ? nameWrapperContract[chain.id] : undefined;

    return contractAddress ? (contractAddress as `0x${string}`) : undefined;
}
