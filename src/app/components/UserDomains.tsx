import React from 'react';
import { useGetUserDomains } from '../../hooks';

type WrappedDomainItem = {
    expiryDate: string;
    fuses: number;
    domain: {
        id: string;
        labelName: string;
        labelhash: string;
        name: string;
        isMigrated: boolean;
        parent: {
            name: string;
            id: string;
        };
        createdAt: string;
        registration: {
            registrationDate: string;
            expiryDate: string;
        };
    };
};

export const UserDomains = () => {
    const { data } = useGetUserDomains();

    return (
        <>
            <span className="text-text-size text-light-text">
                Select a domain to make it your primary ENS name to be used across major web3 platforms.
            </span>
            <ul className="hide-scrollbar mt-3 flex flex-auto scroll-mb-8 list-none flex-col space-y-3 overflow-scroll">
                {data?.account?.wrappedDomains.map((item: WrappedDomainItem, i: number) => {
                    const { name } = item.domain;
                    return (
                        <li key={i}>
                            <button className="mono w-full rounded-2xl bg-white px-4 py-6 text-left text-button-text-size text-dark-text">
                                {name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
