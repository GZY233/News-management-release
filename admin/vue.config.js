const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    historyApiFallback: true,allowedHosts: 'all',
    proxy:{
      "/adminapi":{
        target:"http://localhost:3000",
        changeOrigin:true
      }
    }
  }
})
