const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    AUTH0_NAMESPACE: 'https://portfolio-jerga.com',
  },
};
