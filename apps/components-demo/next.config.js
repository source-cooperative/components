/** @type {import('next').NextConfig} */
export default nextConfig = {
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
