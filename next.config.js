/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://abha-saxena123.github.io/Manage-Expense/:path*',
          },
        ]
      },

}
