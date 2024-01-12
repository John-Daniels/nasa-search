/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: "*.googleusercontent.com",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "cdn.pixabay.com",
  //       port: "",
  //       pathname: "/photo/**",
  //     },
  //   ],
  // },
};

const millionConfig = {
  auto: true,
  // if you're using RSC:
  // auto: { rsc: true },
};

//  million
// export default next(nextConfig, millionConfig);

export default nextConfig;
