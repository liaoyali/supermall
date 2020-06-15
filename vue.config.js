module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                // this.$router和this.$store可以直接取到，一般来说，其他地方不会需要引用它们，所以不用再给路径写别名了
            }
        }
    }
}