process.env.VUE_APP_TITLE = require('./conf/app').app.title;

module.exports = {
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: process.env.VUE_APP_TITLE,
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
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

    // Ensure assets in public folder are copied
    config.plugin('copy')
      .tap(args => {
        args[0].patterns = [
          {
            from: 'public',
            to: '',
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['.DS_Store', 'index.html']
            }
          }
        ];
        return args;
      });
  }
}
