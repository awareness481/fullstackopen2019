const appRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

appRouter.get('/test', (request, response) => {
  response.send('Part 4')
});

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

appRouter.post('/', async (request, response) => {
  const { title, url, author, likes, user} = request.body;
  
  const token = request.token(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const us = await User.findById(decodedToken.id)
    const blog = new Blog(
      {
        title,
        author,
        url,
        likes,
        user: us
      }
    );

    if (!title && !url) {
      response.status(400).send();
      return;
    }

    const blogObject = await blog.save(blog);
    us.blogs = us.blogs.concat(blogObject.id);
    await us.save();

    response.status(201).json(blogObject);
  } catch(exception) {
    next(exception)
  }

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