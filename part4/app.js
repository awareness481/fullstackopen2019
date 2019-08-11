const http = require('http')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const appRouter = require('./controllers/appRouter');
const { MONGODB_URI } = require('./utils/config');


mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', appRouter)


module.exports = app;