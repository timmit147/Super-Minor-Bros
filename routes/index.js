const express = require('express')

module.exports = express
  .Router()

  .get('/', function (req, res) {
    res.render('index', {})
  })
