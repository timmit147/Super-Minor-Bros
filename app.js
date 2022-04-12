require('dotenv').config()
const express = require('express')
const indexRoute = require('./routes/index')
const projectsRoute = require('./routes/projects')
const undergroundRoute = require('./routes/underground')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', './views')

  .use(express.static('./public'))

  .use('/', indexRoute)
  .use('/projects', projectsRoute)

  
  .use('/underground', undergroundRoute)
// .use(errorRoute)
