// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['var(--font-abc)', ...fontFamily.mono]
            },
            colors: {
                'dark-background': '#191919',
                highlight: '#B19731',
                'light-background': '#EAEAEA',
                'light-text': '#A2A2A2',
                'dark-text': '#1A1A1A',
                'hover-rectangle': 'rgba(217, 217, 217, 0.1)',
                'hover-button-20': 'rgba(177, 151, 49, 0.2)',
                'hover-button': '#897423',
                'hover-light': '#E2E2E2'
            },
            fontSize: {
                'title-1-size': ['24px', { lineHeight: '30px' }],
                'pretitle-size': ['12px', { lineHeight: '15px' }],
                'text-size': ['12px', { lineHeight: '15px' }],
                'highlight-size': ['36px', { lineHeight: '45px' }],
                'subtitle-size': ['18px', { lineHeight: '23px' }],
                'subtitle-2-size': ['12px', { lineHeight: '15px' }],
                'title-2-size': ['18px', { lineHeight: '15px' }],
                'highlight-color-size': ['16px', { lineHeight: '20px' }],
                'button-text-size': ['24px', { lineHeight: '30px' }],
                'title-3-size': ['16px', { lineHeight: '20px' }]
            },
            maxWidth: {
                '90vw': '90vw'
            }
        }
    },
    plugins: [require('@headlessui/tailwindcss')]
};
