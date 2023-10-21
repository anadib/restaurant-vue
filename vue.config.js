const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      less: {
        additionalData: '@import "@/assets/css/variables.less";',
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
});
