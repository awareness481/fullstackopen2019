const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: '1',
    author: '1',
    url: '1',
    likes: 99
  },
  {
    title: '2',
    author: '2',
    url: '2',
    likes: 100
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(blog => expect(blog.id).toBeDefined())
  
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'new',
    url: 'url',
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)


})

test('likes defaults to 0', async() => {
  const newBlog = {
    title: '0',
    author: 'new',
    url: 'url'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await blogsInDb();
  const blog = blogs.filter(blog => blog.title === '0');
  expect(blog.likes === 0);
})

test('title missing', async() => {
  const newBlog = {
    title: '',
    author: '',
    url: ''
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
}) 