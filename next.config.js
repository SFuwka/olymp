/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = nextConfig

// const withOptimizedImages = require('next-optimized-images');
// module.exports = withOptimizedImages({
    
// })

const withImages = require('next-images')
module.exports = withImages()