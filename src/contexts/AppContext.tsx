'use client';

import React, { ReactNode, createContext, useState } from 'react';
import { Toast } from '../types';

const initialContext = {
    refreshWallet: false,
    // eslint-disable-next-line
    setRefreshWallet: (value: boolean) => {},
    toast: null as Toast | null,
    // eslint-disable-next-line
    setToast: (toast: Toast | null) => {}
};

export const AppContext = createContext(initialContext);

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [refreshWallet, setRefreshWallet] = useState(false);
    const [toast, setToast] = useState<Toast | null>(null);

    return (
        <AppContext.Provider value={{ refreshWallet, setRefreshWallet, toast, setToast }}>
            {children}
        </AppContext.Provider>
    );
};
