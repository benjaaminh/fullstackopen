const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const comment = require('../models/comment')


commentsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)//finds the blog by id
  const comments = await Comment.find({ blog })//finds comments from blog
  response.json(comments)
})


commentsRouter.post('/:id/comments', async (request, response) => {

  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)

  const comment = new Comment({
    content: body.content,
    blog: blog.id
  }
  )
  const savedComment = await comment.save()
  response.status(201).json(savedComment)
})


module.exports = commentsRouter