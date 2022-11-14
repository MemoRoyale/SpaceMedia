/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');  
const nextConfig = withPWA({
  
  typescript:{
    ignoreBuildErrors: true,

  },
  
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[
      'i.pinimg.com',
      'lh3.googleusercontent.com'
    ],
  }
});

module.exports = nextConfig
