const path = require('path');
const getLogger = require('webpack-log');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./src/config');
const log = getLogger({ name: 'Le Devoir' });

if (config.title.includes('Titre de l\'article')) {
  log.warn('Le titre de l\'article est manquant.');
}
if (!config.date.endsWith(new Date().getFullYear().toString())) {
  log.warn(`L\'année spécifiée dans la date ne correspond pas à ${new Date().getFullYear().toString()}.`);
}
if (config.update && !config.update.endsWith(new Date().getFullYear().toString())) {
  log.warn(`L\'année spécifiée dans la mise à jour ne correspond pas à ${new Date().getFullYear().toString()}.`);
}
if (config.description.includes('description du site web ici')) {
  log.warn('La description du site web est manquante.');
}
if (!config.url.endsWith('.html')) {
  log.warn('L\'URL du site web est invalide.');
}
if (!config.image.endsWith('.jpg') &&
  !config.image.endsWith('.jpeg') &&
  !config.image.endsWith('.png')) {
  log.warn('L\'image de partage du site web est invalide.');
}

module.exports = (env, argv) => {
  return {
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      client: {
        overlay: true,
      },
      port: 8080
    },
    devtool: 'inline-source-map',
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/app/app.js'],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/webfonts/[hash][ext][query]'
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              "presets": [
                ["@babel/preset-env", {
                  useBuiltIns: "usage",
                  corejs: 3,
                }]
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(
        {
          patterns: [
            {
              from: 'src/assets',
              to: 'assets',
              globOptions:{
                ignore: ['*.scss', 'webfonts/**/*']
              }
            },
            {
              from: 'src/data',
              to: 'data',
            }
          ]
        }
      ),
      new HtmlWebpackPlugin({
        hash: false,
        title: config.title,
        title_sub1: config.title_sub1,
        title_sub2: config.title_sub2,
        authors: config.authors.map((a, i) =>
          `<a href=${a.url}>${a.name}</a>` +
          `${(i < config.authors.length - 2) ? ', ' : ''}` +
          `${(i === config.authors.length - 2) ? ' et ' : ''}`).join(''),
        authorsGA: config.authors.map(d => d.name).join(', '),
        authorsRoles: (() => {
          const roles = Array.from(new Set(config.authors.map(a => a.role)));
          return roles.map(role => {
            const authors = config.authors.filter(a => a.role === role);
            return `${role} par ${authors.map((a, i) =>
              `${a.name}` +
              `${(i < authors.length - 2) ? ', ' : ''}` +
              `${(i === authors.length - 2) ? ' and ' : ''}`).join('')
            }.`
          }).join(' ');
        })(),
        authorMetas: (() => {
          let res = `<meta name="author" content="`
          config.authors.forEach((a, i) => {
            res+= `${a.name}${i===config.authors.length-1 ? '' : i===config.authors.length-2 ? ' et ' : ', '}`
          })
          res+=`">`
          return res
        })(),
        date: config.update ? `Mise à jour le ${config.update}` : config.date,
        url: config.url,
        description: config.description,
        image: config.image,
        keywords: config.keywords.map(k => `"${k}"`),
        template: './src/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
      })
    ]
  };
};
