const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://api.wutongwei.com"';
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/v1/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
