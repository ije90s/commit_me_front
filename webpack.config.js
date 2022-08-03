const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';

  return {
    mode: prod ? 'production' : 'development', // 개발, 프로덕션 모드 확인
    devtool: prod ? 'hidden-source-map' : 'eval', // 모드에 따라 SourceMap 확인 여부
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
    },
    entry: '/src/index.tsx', // 컴파일 시작할 파일, 해당 파일부터 필요한 모듈 로딩 및 하나의 파일로 묶는다.
    output: {
      // webpack이 생성한 결과물의 위치, 이름
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
    },
    resolve: {
      // 배열 안 확장자에 따라 처리
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias:{
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      // loader 설정. bable-loader, ts-loader, css-loader 등¸
      rules: [
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
        },
        // {
        //   test: /\.(js|jsx)$/,
        //   exclude: "/node_modules/",
        //   loader: "babel-loader",
        // },
        // {
        //   test: /\.css$/,
        //   use: [{ loader: "css-loader" }],
        // },
        // {
        //   loader: "file-loader",
        //   test: /\.jfif$/,
        //   options: {
        //     name: "[name].[ext]",
        //   },
        // },
      ],
    },
    plugins: [
      // 부가 기능
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };
};
