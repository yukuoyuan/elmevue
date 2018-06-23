var express = require('express')
var app = express()
var appData = require('../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

// 解决跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/mock/seller', function (req, res) {
  // 返回的json对象
  var obj = {
    code: 0,
    list: seller
  }

  res.jsonp(obj)
})

app.get('/mock/goods', function (req, res) {
  // 返回的json对象
  var obj = {
    code: 0,
    list: goods
  }

  res.jsonp(obj)
})

app.get('/mock/ratings', function (req, res) {
  // 返回的json对象
  var obj = {
    code: 0,
    list: ratings
  }

  res.jsonp(obj)
})

// 启动服务，监听一个端口，不要和页面的端口
app.listen(3030)
