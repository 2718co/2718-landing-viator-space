import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';
import '../styles/globals.css';

import localFont from 'next/font/local';

const customFont = localFont({
    src: './assets/ABCDiatypePlusVariable.woff2',
    variable: '--font-abc'
});

const Cursor = dynamic(() => import('./components/Cursor'), {
    ssr: true
});

function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en" className={`${customFont.variable} mono bg-dark-background font-mono`}>
            <body className="absolute inset-0 bg-no-repeat bg-bottom bg-cover bg-[url('/background.svg')]">
                <main>{children}</main>
                <Cursor />
            </body>
        </html>
    );
}

export default RootLayout;
