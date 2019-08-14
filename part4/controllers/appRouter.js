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
  const { title, url} = request.body;

  const blog = new Blog(request.body);

  if (!title && !url) {
    response.status(400).send();
    return;
  }

  const blogObject = await blog.save(blog);

  response.status(201).json(blogObject);
});

appRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body;
  const { id } = request.params;

  const blog = {
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

appRouter.delete('/:id', async (request, response, next) => {
  
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end()

})

module.exports = appRouter;