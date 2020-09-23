module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/tripday-vue/' : '/'
  ,
  // configureWebpack: {
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       title: 'Custom template',
  //       inject: false,
  //       template: './public/index.html',
  //       googleApiUrl: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLEAPI}`
  //     })
  //   ]
  // }
}