const { composePlugins, withNx } = require("@nx/webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Import the plugin

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: "node",
  }),
  (config) => {
    if (!config.module) {
      config.module = { rules: [] };
    } else if (!config.module.rules) {
      config.module.rules = [];
    }

    // Rule for handling image files
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            emitFile: false, // Adjust based on your need
          },
        },
      ],
    });

    // Adjusted rule for CSS handling
    // Using MiniCssExtractPlugin.loader for SSR or server environments where you don't inject styles into the DOM
    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /components/, // Adjust the regex to match your client-side files' location
      use: "ts-loader", // Assuming you're using ts-loader for TypeScript files
    });

    // Add MiniCssExtractPlugin to the plugins array
    // Ensure to check if config.plugins exists, if not, initialize it
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    );

    return config;
  },
);
