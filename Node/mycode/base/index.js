const express = require('express');

const app = express();

// 视图引擎
app.set('view engine', 'ejs');

// 识别外部样式表
app.use('/assets', express.static('assets'));
app.get('/', (req, res) => {
  // res.send("welcome");
  // res.sendFile(`${__dirname}/public/index.html`)
  res.render('index')
})

app.get('/about', (req, res) => {
  // res.send("welcome");
  // res.sendFile(`${__dirname}/public/index.html`)
  res.render('about')
})
// 路由参数
app.get('/profile/:id', (req, res) => {
  const data = [
    {
      age: 25,
       name: [
        {
          name: 'Li'
        },
        {
          name: 'lu'
        }
      ]
    },
    {
      age:29,
      name: [
        {
          name: 'Amy'
        },
        {
          name: 'Henry'
        },
        {
          name:'John'
        }
      ]
    }
  ]

  res.render('profile', { websiteName: req.params.id, data })
})
app.listen(3000)