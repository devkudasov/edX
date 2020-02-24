const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const storage = require('./storage')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

app.post('/posts', routes.addPost)
app.get('/posts', routes.getPosts)
app.put('/posts/:postId', routes.updatePost)
app.delete('/posts/:postId', routes.deletePost)

app.post('/posts/:postId/comments', routes.addComment)
app.get('/posts/:postId/comments', routes.getComments)
app.put('/posts/:postId/comments/:commentId', routes.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.deleteComment)

app.listen(3000)