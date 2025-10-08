/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "api.windigitechera.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async rewrites(){
    return [
      {
        source:"/api/:path*",
        destination: process.env.NEXT_PUBLIC_SERVER_URL + "/api/:path*"
      }
    ]
  }
};

module.exports = nextConfig;
