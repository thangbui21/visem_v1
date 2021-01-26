let publicPath = process.env.NODE_ENV === 'production' ? 'light-blue-vue-admin/' : '/';

module.exports = {
    publicPath,
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map'
    },

    devServer: {
        https: true,
        proxy: {
            '^/services': {
                target: 'http://192.168.1.1:8000/',
                ws: true,
                changeOrigin: true
            }
        }
    }

};
