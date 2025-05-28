/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    domains: [
      "utfs.io",                
      "upload.wikimedia.org",   
      "placehold.co"          
    ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/imgres*",   
      },
    ],
  },
};

module.exports = nextConfig;
