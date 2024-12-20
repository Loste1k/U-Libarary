import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/:path*'
            }
        ];
    },
    distDir: 'build',
};

export default nextConfig;
