module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
  	resolve: {
      modules: ['node_modules'],
      alias: {
        'xlsx': 'xlsx/dist/xlsx.mini.min.js',
      }
  	},
  }
}