import { useNetwork } from 'wagmi';

interface DomainMap {
    [chainId: number]: string;
}

const domain2718 = '2718';

export function useDomain(): string {
    const { chain } = useNetwork();

    const domains: DomainMap = {
        1: domain2718,
        5: '27128'
    };

    return chain?.id ? domains[chain.id] : domain2718;

}