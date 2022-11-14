/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
    register: true,
    skipWaiting: true,
})
const nextConfig = withPWA({
  typescript:{
    ignoreBuildErrors: true,

  },
  fallback: false,


  reactStrictMode: true,
  
  images:{
    domains:[
      'i.pinimg.com',
      'lh3.googleusercontent.com'
    ],
  }
})

module.exports = nextConfig
