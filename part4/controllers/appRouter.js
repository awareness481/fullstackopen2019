const appRouter = require('express').Router();
const Blog = require('../models/Blog');

appRouter.get('/test', (request, response) => {
  response.send('Part 3')
});

appRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
});

appRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
});

module.exports = appRouter;