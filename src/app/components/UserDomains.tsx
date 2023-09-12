import React from 'react';

export const UserDomains = () => {
    return (
        <>
            <span className="text-text-size text-light-text">
                Select a domain to make it your primary ENS name to be used across major web3 platforms.
            </span>
            <ul className="hide-scrollbar mt-3 flex flex-auto scroll-mb-8 list-none flex-col space-y-3 overflow-scroll">
                {Array(7)
                    .fill(0)
                    .map((item) => (
                        <li key={item}>
                            <button className="mono w-full rounded-2xl bg-white px-4 py-6 text-left text-button-text-size text-dark-text">
                                areo.2718.eth
                            </button>
                        </li>
                    ))}
            </ul>
        </>
    );
};
