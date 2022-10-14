// @ts-check
const webpack = require('webpack');
const fs = require("fs");

/**
 * @readonly
 * @type {import('@swc/core').Config}
 */
const swcConfig = {
  jsc: {
    parser: { syntax: 'typescript', tsx: true },
    transform: { react: { runtime: 'automatic' } },
  },
};

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories(pkg) {
  const scope = pkg ? [pkg] : fs.readdirSync("../packages")
  const res = scope
    .map((_package) => `../packages/${_package}/stories`)
    .filter((storyDir) => fs.existsSync(storyDir))
    .map((storyDir) => `../${storyDir}/*.stories.tsx`);
  console.log(res);
  return res;
}

/** @type {import('@storybook/core-common').StorybookConfig} */
const config = {
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: {
      name: 'webpack5',
      options: { fsCache: true, lazyCompilation: true },
    },
    disableTelemetry: true,
  },
  features: {
    postcss: false,
    emotionAlias: false,
    buildStoriesJson: true,
    interactionsDebugger: true,
    argTypeTargetsV7: true,
    storyStoreV7: true,
    modernInlineRender: true,
  },
  stories: getStories(),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: 'storybook-addon-turbo-build',
      options: {
        esbuildMinifyOptions: { target: 'es2021' },
        managerTranspiler: () => ({ loader: 'swc-loader', options: swcConfig }),
        previewTranspiler: () => ({ loader: 'swc-loader', options: swcConfig }),
      },
    },
  ],
  webpackFinal: (config) => {
    config.plugins.push(new webpack.DefinePlugin({ SC_DISABLE_SPEEDY: true }));
    config.performance.hints = false;
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
  typescript: {
    reactDocgen: false,
  },
};

module.exports = config;
