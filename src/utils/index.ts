export const formatBalance = (balance: { value: bigint; decimals: number } | null, digits: number): string => {
    return balance ? (Number(balance.value) / 10 ** balance.decimals).toFixed(digits) : '0';
};

