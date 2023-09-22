/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Feature-Policy',
                        value: 'gyroscope; accelerometer',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
