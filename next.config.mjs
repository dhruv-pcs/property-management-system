/** @type {import('next').NextConfig} */


const nextConfig = { reactStrictMode: true, transpilePackages: ["@nivo"], experimental: { esmExternals: "loose",   forceSwcTransforms: true,} }

export default nextConfig;
