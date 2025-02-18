import express from 'express'
import { doLike, likecount } from '../controllers/BlogLike.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const BlogLikeRoute = express.Router()

BlogLikeRoute.post('/dolike', authenticate, doLike)
BlogLikeRoute.get('/getlike/:blogid/:userid', likecount)

export default BlogLikeRoute