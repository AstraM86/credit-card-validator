const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

// Устанавливаем режим разработки для e2e
const devConfig = {
  ...config,
  mode: 'development',
};

const compiler = webpack(devConfig);
const server = new WebpackDevServer(compiler, devConfig.devServer || {});
server.listen(9000, 'localhost', (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send('ok');
  }
});
