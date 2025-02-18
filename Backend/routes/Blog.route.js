import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog} from '../controllers/Blog.Controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'
const BlogRoute = express.Router()

BlogRoute.post('/add', authenticate, upload.single('file') ,addBlog)
BlogRoute.get('/edit/:blogid', authenticate, editBlog)
BlogRoute.put('/update/:blogid', authenticate, upload.single('file'), updateBlog)
BlogRoute.delete('/delete/:blogid', authenticate, deleteBlog)
BlogRoute.get('/getall', authenticate, showAllBlog)

BlogRoute.get('/getblog/:slug', getBlog)
BlogRoute.get('/getrelatedblog/:category/:blog', getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
BlogRoute.get('/search', search)

BlogRoute.get('/blogs',  getAllBlogs)

export default BlogRoute

             



                                                                    