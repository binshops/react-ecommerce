// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "imgix",
    path: "https://your-imgix-account-url.hashed-image.com/",
    domains: ["your-domain.com", "cdn.example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
        pathname: "/images/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128],
    deviceSizes: [640, 750, 828, 1080, 1202, 1350, 1536, 1678, 2048],
    unoptimized: false,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
};

export default nextConfig;
