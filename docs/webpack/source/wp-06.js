module.exports = {
  module: {
    rule: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader:'postcss-loader',
            options:{
              plugins:()=>{
                require('autoprefixer')({
                  browsers:["last 2 version","> 1%", "iOS"]
                })
              }
            }
          }
        ]
      }
    ]
  }
}
