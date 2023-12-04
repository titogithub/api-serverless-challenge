import { join, resolve as _resolve } from 'path';
import { lib } from 'serverless-webpack';
import nodeExternals from 'webpack-node-externals';

export const context = __dirname;
export const mode = lib.webpack.isLocal ? 'development' : 'production';
export const entry = lib.entries;
export const externalsPresets = { node: true };
export const devtool = lib.webpack.isLocal
  ? 'eval-cheap-module-source-map'
  : false;
export const resolve = {
  extensions: ['.mjs', '.json', '.ts', '.js'],
  symlinks: false,
  cacheWithContext: false,
};
export const output = {
  libraryTarget: 'commonjs',
  path: join(__dirname, '.webpack'),
  filename: '[name].js',
};
export const optimization = {
  nodeEnv: process.env.NODE_ENV,
  concatenateModules: false,
  minimize: false,
};
export const target = 'node';
export const externals = [nodeExternals()];
export const module = {
  rules: [
    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
    {
      test: /\.(tsx?)$/,
      loader: 'ts-loader',
      exclude: [
        [
          _resolve(__dirname, 'node_modules'),
          _resolve(__dirname, '.serverless'),
          _resolve(__dirname, '.webpack'),
        ],
      ],
      options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      },
    },
  ],
};
export const plugins = [];
