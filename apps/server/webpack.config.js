const { composePlugins, withNx } = require("@nx/webpack");

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: "node",
  }),
  (config) => {
    // Assuming `module.rules` exists, if not, initialize it as an empty array.
    if (!config.module) {
      config.module = { rules: [] };
    } else if (!config.module.rules) {
      config.module.rules = [];
    }

    // Add rule for handling image files
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            emitFile: false, // Set to true if you're targeting 'web' and want to emit files
          },
        },
      ],
    });

    return config;
  },
);
