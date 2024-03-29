const CracoLessPlugin = require('craco-less');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            relativeUrls: false,
            modifyVars: {
              '@primary-color': '#01579B',
              '@primary-color-xl': '#ffe3d9',
              '@border-color': '#e7e7e7',
              'border-radius-base': '3px',
              '@input-height-sm': '45px',
              '@input-height-base': '45px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory(/** options */)]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
