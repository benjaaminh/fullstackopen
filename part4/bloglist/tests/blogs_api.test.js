const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  
    const promiseArray=blogObjects.map(blog=>blog.save())
    await Promise.all(promiseArray)
  
  })

  test('correct amount of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogExample = blogsAtStart[0]

    const blogResult = await api
    .get(`/api/blogs/${blogExample.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    expect(blogResult.body.id).toBeDefined()
  })

  test('a blog can be added', async () =>{
    const newBlog={
      title: 'new blog',
      author: 'joe',
      url: 'example.com',
      likes: 5
    } 

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).toContain(
    'new blog'
  )
  })

  test('likes default to 0 if none are given', async () => {
    const newBlog={
      title: 'new blog',
      author: 'joe',
      url: 'example.com'
    } 
   const response= await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
  
  test('returns 400 if title is missing', async () => {
    const newBlog={
      author: 'joe',
      url: 'example.com',
      likes:3
    } 
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  })

  test('returns 400 if url is missing', async () => {
    const newBlog={
      author: 'joe',
      title:'example blog',
      likes:3
    } 
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  })

  afterAll(async () => {
    await mongoose.connection.close()
  })