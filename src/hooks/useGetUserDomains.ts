import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useNetwork } from 'wagmi';

interface SubgraphUrlMap {
    [chainId: number]: string;
}

const getUserDomains = gql`
    query getNames($id: ID!, $expiryDate: Int) {
        account(id: $id) {
            registrations(where: { expiryDate_gt: $expiryDate }) {
                registrationDate
                expiryDate
                domain {
                    id
                    labelName
                    labelhash
                    name
                    isMigrated
                    parent {
                        name
                        id
                    }
                    createdAt
                }
            }
            domains {
                id
                labelName
                labelhash
                name
                isMigrated
                parent {
                    name
                    id
                }
                createdAt
                registration {
                    registrationDate
                    expiryDate
                }
            }
            wrappedDomains {
                expiryDate
                fuses
                domain {
                    id
                    labelName
                    labelhash
                    name
                    isMigrated
                    parent {
                        name
                        id
                    }
                    createdAt
                    registration {
                        registrationDate
                        expiryDate
                    }
                }
            }
        }
    }
`;

const queryUserDomains = async (client: ApolloClient<NormalizedCacheObject>, address: `0x${string}` | undefined) => {
    function oneYearFromNowTimestamp() {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        return Math.floor(currentDate.getTime() / 1000);
    }

    const { data } = await client.query({
        query: getUserDomains,
        variables: {
            id: address?.toLowerCase(),
            expiryDate: oneYearFromNowTimestamp()
        }
    });

    return data;
};

export function useGetUserDomains() {
    const { address } = useAccount();
    const { chain } = useNetwork();

    const subgraphUrlMainnet = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

    const subgraphUrls: SubgraphUrlMap = {
        1: subgraphUrlMainnet,
        5: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli'
    };

    const subgraphUrl = chain?.id ? subgraphUrls[chain.id] : subgraphUrlMainnet;

    const client = new ApolloClient({
        uri: subgraphUrl,
        cache: new InMemoryCache()
    });

    return useQuery({
        enabled: !!address,
        queryKey: ['getUserDomains', address, chain?.id],
        queryFn: async () => {
            return await queryUserDomains(client, address);
        }
    });
}
