/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/sys/': {
      target: 'http://a24931d819fe74448b02d3dd2481a887-770005320.ap-southeast-1.elb.amazonaws.com:8081',
      changeOrigin: true,
    },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'http://a24931d819fe74448b02d3dd2481a887-770005320.ap-southeast-1.elb.amazonaws.com:8081',
      changeOrigin: true,
    },
    '/auth/': {
      target: 'http://afe79c5d053cc40ad97eae0351ec865a-1730116590.ap-southeast-1.elb.amazonaws.com:8080',
      changeOrigin: true,
    },
  },

  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
