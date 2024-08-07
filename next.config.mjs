/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "res.cloudinary.com" }],
    },
    reactStrictMode: false,
};

export default nextConfig;
