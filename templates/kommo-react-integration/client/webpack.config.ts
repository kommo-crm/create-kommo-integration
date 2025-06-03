import path from 'path';

import webpack from 'webpack';
import ZipPlugin from 'zip-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import hashSum from 'hash-sum';
import md5 from 'md5';

import 'webpack-dev-server';

import crmModuleAliases from './src/crmModuleAliases';

const enum Environments {
  DEV = 'dev',
  PROD = 'prod',
}

const enum Mode {
  DEV = 'dev',
  PROD = 'prod',
}

const ENVIRONMENT = process.env.ENVIRONMENT as Environments;
const PORT = process.env.LOCALHOST_PORT || 9000;

const isDev = ENVIRONMENT === Environments.DEV;

const MODE = isDev ? Mode.DEV : Mode.PROD;

const hashPathMap = new Map<string, string>();
const createdHashSet = new Set<string>();
const FIRST_NUMBER_REGEX = /^\d/;

const createHash = (content: string, fn: (input: string) => string): string => {
  const hash = fn(content);

  return FIRST_NUMBER_REGEX.test(hash) ? 'a' + hash : hash;
};

const generateStyleHash = (localName: string, resourcePath: string): string => {
  const relativePath = resourcePath.replace(__dirname + '/', '');
  const stylePath = `${relativePath}-${localName}`;

  if (hashPathMap.has(stylePath)) {
    return hashPathMap.get(stylePath)!;
  }

  const hash = createHash(stylePath, hashSum);

  if (createdHashSet.has(hash)) {
    const md5Hash = createHash(stylePath, md5);

    if (createdHashSet.has(md5Hash)) {
      throw new Error(
        `Collision detected for class name ${localName} in ${resourcePath}`
      );
    }

    createdHashSet.add(md5Hash);
    hashPathMap.set(stylePath, md5Hash);

    return md5Hash;
  }

  createdHashSet.add(hash);
  hashPathMap.set(stylePath, hash);

  return hash;
};

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',

  entry: {
    main: isDev ? './src/dev.index.ts' : './src/index.ts',
  },

  devtool: isDev ? 'eval-source-map' : undefined,

  output: {
    filename: 'script.js',

    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },

          {
            loader: 'css-loader',

            options: {
              modules: {
                // localIdentName: '[path]--[local]',

                getLocalIdent: (
                  context: { resourcePath: string },
                  localIdentName: string,
                  localName: string
                ) => {
                  const { resourcePath } = context;

                  if (/local.css$/i.test(resourcePath)) {
                    if (isDev) {
                      return null;
                    }

                    return generateStyleHash(localName, resourcePath);
                  }

                  return localName;
                },
              },
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer'], ['postcss-nested']],
              },
            },
          },
        ],
      },

      { test: /\.(jpg|png)$/, type: 'asset/inline' },

      { test: /\.svg$/i, type: 'asset', resourceQuery: { not: [/component/] } },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /component/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],

    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@hoc': path.resolve(__dirname, 'src/hoc'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@callbacks': path.resolve(__dirname, 'src/callbacks'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      'vendor': path.resolve(__dirname, 'vendor'),
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({ path: `deploy/${MODE}/.${ENVIRONMENT}.env` }),
    new CopyPlugin({
      patterns: [
        { from: './public/manifest.json', to: 'manifest.json' },
        { from: './public/i18n', to: 'i18n' },
        { from: './public/images', to: 'images' },
      ],
    }),

    // @ts-expect-error: broken types due to mismatched webpack versions
    new ZipPlugin({
      filename: 'widget.zip',

      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
      zipOptions: { forceZip64Format: false },
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    allowedHosts: 'all',

    port: PORT,

    setupMiddlewares: (middlewares) => {
      return middlewares.filter(
        (middleware) => middleware.name !== 'cross-origin-header-check'
      );
    },

    hot: false,
    liveReload: false,
    webSocketServer: false,

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Sec-Fetch-Mode, Sec-Fetch-Site, Sec-Fetch-Dest',
      'Access-Control-Allow-Credentials': 'true',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Timing-Allow-Origin': '*',
    },
  },

  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },

  externals: {
    ...Object.entries(crmModuleAliases).reduce(
      (total, [key, value]) => {
        total[key] = `commonjs2 ${value}`;

        return total;
      },
      {} as Record<string, string>
    ),
  },
};

export default config;
