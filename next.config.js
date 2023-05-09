/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    WEB_URL: process.env.WEB_URL
  },
};