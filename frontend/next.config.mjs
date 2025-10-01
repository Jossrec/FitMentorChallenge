/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // <- esto habilita el export estático
  images: { unoptimized: true } // si usas next/image
  // basePath y assetPrefix NO son necesarios en Cloudflare Pages
};
export default nextConfig;
