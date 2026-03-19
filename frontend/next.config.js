/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "jira" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    // Fallback rewrite: unmatched paths (i.e. API calls) are proxied to the backend.
    // The placeholder URL is replaced at container startup by entrypoint.sh
    // with the INTERNAL_API_URL env var. When NEXT_PUBLIC_API_URL points to an
    // external API route, the browser never hits same-origin so this is dormant.
    return {
      fallback: [
        { source: "/:path*", destination: "http://__INTERNAL_API_PLACEHOLDER__/:path*" },
      ],
    };
  },
};

module.exports = nextConfig;
