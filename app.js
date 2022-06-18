const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

//判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require("./config/mongoose")
const port = process.env.PORT

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})