module.exports={
    
        module: {
          rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
              loader: 'code-metrics-loader',
              options:{
                errorLimit: 20
              }
            }],
          }]
        }
      
}