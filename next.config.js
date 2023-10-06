/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.wehorse-stage.com',
                port: '',
            },
        ],
    },
};

module.exports = nextConfig;
