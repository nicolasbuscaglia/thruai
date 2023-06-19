/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/chats",
        destination: "/chats/all",
        permanent: true,
      },
      {
        source: "/case",
        destination: "/case/all",
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
