const blogsRouter= require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user',{username:1,name:1})
 
      response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
const body = request.body

const user = request.user

 const blog = new Blog({
  title:body.title,
  author:body.author,
  url:body.url,
  likes:body.likes,
  user:user.id
 })

  savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
 
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
 
  const loggedInUser = request.user

  const blogtoDelete = await Blog.findById(request.params.id)

  if (blogtoDelete.user.toString() === loggedInUser.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  }
  else{
    return response.status(401).json({
      error: 'wrong account'
    })
  }

  
})

blogsRouter.put('/:id', async (request, response) => {

const body = request.body

const blog = {
  user:body.user.id,
  likes: body.likes,
  author: body.author,
  title: body.title,
  url: body.url
}

  const updatedBlog= await Blog.findByIdAndUpdate(request.params.id,blog, { new: true })
   response.status(200).json(updatedBlog)
 })
 


module.exports= blogsRouter