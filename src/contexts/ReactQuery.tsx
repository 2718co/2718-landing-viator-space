'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React from 'react';

export function ReactQuery({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}
