// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'flagsapi.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/w500/**',
          },{
            protocol: "https",
            hostname: "image.tmdb.org",
            pathname: "/t/p/original/**",
            port: ""
          }
        ],
    },
    env: {
      customKey: process.env.TMDB_TOKEN, // pulls from .env file
    }
}
   
module.exports = nextConfig