const path = require("path");

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      enforce: "pre",
      test: /\.jsx?$/,
      include: [path.join(__dirname, "src")],
      loader: "eslint-loader",
      options: {
        emitWarning: dev,
        // eslint-disable-next-line global-require
        formatter: require("eslint-friendly-formatter"),
        fix: true,
      },
    });
    return config;
  },
};
