/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
        serverActions: true
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
        topLevelAwait: true,
    }
        return config
    }
}

module.exports = nextConfig
