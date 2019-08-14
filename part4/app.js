const http = require('http')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const appRouter = require('./controllers/appRouter');
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger')


// logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  // .then(() => {
  //   logger.info('connected to MongoDB')
  // })
  // .catch((error) => {
  //   logger.error('error connection to MongoDB:', error.message)
  // })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', appRouter)


module.exports = app;