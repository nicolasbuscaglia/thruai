/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/chats",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/chats/:path",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/case",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/soon",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
