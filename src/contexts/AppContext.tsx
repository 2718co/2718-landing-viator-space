'use client';

import React, { ReactNode, createContext, useState } from 'react';

const initialContext = {
    refreshWallet: false,
    // eslint-disable-next-line
    setRefreshWallet: (value: boolean) => {}
};

export const AppContext = createContext(initialContext);

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [refreshWallet, setRefreshWallet] = useState(false);

    return <AppContext.Provider value={{ refreshWallet, setRefreshWallet }}>{children}</AppContext.Provider>;
};
