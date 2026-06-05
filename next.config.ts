import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactCompiler: true,

typescript: {
ignoreBuildErrors: true,
},

images: {
domains: ["ecommerce.routemisr.com"],
},
};

export default nextConfig;
