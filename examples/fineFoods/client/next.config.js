/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const pluginAntdLess = withAntdLess({
  // modifyVars: {
  //   '@THEME--DARK': 'theme-dark',
  // },
  lessVarsFilePath: './src/styles/variables.less',
  // cssLoaderOptions: {
  //   esModule: false,
  //   sourceMap: false,
  //   modules: {
  //     mode: 'local',
  //   },
  // },
});

module.exports = withPlugins([[pluginAntdLess]], {
  webpack(config) {
    return config;
  },
  // images: {
  //   disableStaticImages: true,
  // },
  // NextFuture
  webpack5: true,
});
