/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/pages/work.html', destination: '/work', permanent: true },
      { source: '/pages/writing.html', destination: '/writing', permanent: true },
      { source: '/pages/experiments.html', destination: '/experiments', permanent: true },
      { source: '/pages/about.html', destination: '/about', permanent: true },
      { source: '/pages/contact.html', destination: '/contact', permanent: true },
      { source: '/pages/project.html', destination: '/work', permanent: false },
      { source: '/pages/article.html', destination: '/writing', permanent: false },
    ];
  },
};

export default nextConfig;
