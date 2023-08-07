/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
      },
      {
        protocol: "https",
        hostname: "seed-mix-image.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "images-ak.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "t.scdn.co",
      },
      {
        protocol: "https",
        hostname: "thisis-images.scdn.co",
      },
    ],
  },
};

module.exports = nextConfig;
