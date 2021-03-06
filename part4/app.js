const http = require('http')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// UTILS
const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger')
const getTokenFrom = require('./utils/token')


// ROUTERS
const appRouter = require('./controllers/appRouter');
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login');


logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())

app.use(getTokenFrom);
app.use('/api/blogs', appRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app;