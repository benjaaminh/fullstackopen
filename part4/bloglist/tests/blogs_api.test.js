const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

  test('deletion succeeds with code 204 if id is valid', async () =>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('deletion does not succeed  if id is invalid', async () =>{
    const invalidId='5a3d5da59070081a82a3445'

  
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('updating likes works', async () =>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog={
      title: `${blogToUpdate.title}`,
      author: `${blogToUpdate.author}`,
      url: `${blogToUpdate.url}`,
      likes: 6
    } 

   await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
   
    expect(blogsAtEnd[0].likes).toBe(6)
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
    test('creation fails when no username is given', async () => {
      const usersAtStart= await helper.usersInDb()
      const newUser = {
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails when no password is given', async () => {
      const usersAtStart= await helper.usersInDb()
      const newUser = {
        username: 'floppa',
        name: 'Superuser'
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('no password given')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails when password is too short', async () => {
      const usersAtStart= await helper.usersInDb()
      const newUser = {
        username: 'floppa',
        name: 'Superuser',
        password:'he'
      }

      const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password minimum length is 3 characters')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })