import { encodePacked, keccak256 } from 'viem';

export const formatBalance = (balance: { value: bigint; decimals: number } | null, digits: number): string => {
    return balance ? (Number(balance.value) / 10 ** balance.decimals).toFixed(digits) : '0';
};


function toHex(value: string): Uint8Array {
    const byteArray = new TextEncoder().encode(value);
    return byteArray;
}

export function getNode(subdomain: string, parentNode: `0x${string}`): string {
    return keccak256(encodePacked(
        ['bytes32', 'bytes'],
        [parentNode, keccak256(toHex(subdomain))]
    ));
}

export function getParentNode(domain: string): string {

    const parentDomain = 'eth';

    // Using the updated toHex function for parentDomain
    const parentDomainHex = toHex(parentDomain);

    // Convert bytes32(0) to hex format
    const zeroBytes32Hex = '0x0000000000000000000000000000000000000000000000000000000000000000';

    const subnode = keccak256(encodePacked(
        ['bytes32', 'bytes'],
        [zeroBytes32Hex, keccak256(parentDomainHex)]
    ));

    return keccak256(encodePacked(
        ['bytes32', 'bytes'],
        [subnode, keccak256(toHex(domain))]
    ));
}
