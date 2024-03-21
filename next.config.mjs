import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js configuration options (if any)
};

export default withPWA({
  dest: 'public', // Default output directory for generated PWA assets
  register: true, // Register manifest automatically (recommended)
  // Add other PWA configuration options as needed (see below)
})(nextConfig);