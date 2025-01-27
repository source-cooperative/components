/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/components", // for GitHub Pages, which is hosted at /components
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

module.exports = nextConfig;
