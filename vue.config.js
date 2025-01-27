process.env.VUE_APP_TITLE = require('./conf/app').app.title;

module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    // Configure Babel for large components
    config.module
      .rule('js')
      .use('babel-loader')
      .tap(options => ({
        ...options,
        generatorOpts: {
          compact: false,
          maxLineLength: 2097152 // 2MB
        }
      }));

    // Configure asset handling
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .set('type', 'asset')
      .set('generator', {
        filename: 'assets/img/[name][ext]'
      });
  }
}
