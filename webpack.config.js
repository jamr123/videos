
var webpack = require('webpack')
const path = require('path')


module.exports = {
  entry:'./scr/app_vue/main.js',
  output: {
    path:path.resolve(__dirname, "scr/public/js"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [

      {
        test: /\.js$/,
        include: [
                    path.resolve(__dirname, "src"),
                    
                ],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use:{loader:'vue-loader'}
      },
      {test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.css?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /tether\.js$/, loader: "expose?Tether" },
      {test: /bootstrap\/js\/src\/.*\.js$/}
    ],




  },

  plugins: [
 
     // ...
   /*
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
  
  new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: '"production"'
     }
   })
  
   new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })*/


  ]
}
