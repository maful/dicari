/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    newNextLinkBehavior: true,
  },
  eslint: {
    dirs: ["pages", "src"],
  },
};
