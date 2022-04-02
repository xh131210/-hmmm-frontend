const path = require('path')
module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // 代理配置
    // proxy: {
    //   '/api': {
    //     // 本地服务
    //     target: 'http://127.0.0.1:8080', // 跨域请求的地址
    //     changeOrigin: true,
    //     pathRewrite: ''
    //   }
    // }

  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/.svg$/)
      .include.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  }
}
