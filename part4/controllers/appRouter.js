const appRouter = require('express').Router();
const Blog = require('../models/Blog');

appRouter.get('/test', (request, response) => {
  response.send('Part 4')
});

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

appRouter.post('/', async (request, response) => {
  const blog = await blog.save(new Blog(request.body))

  response.status(201).json(blog);
});

module.exports = appRouter;