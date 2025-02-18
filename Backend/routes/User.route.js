import upload from "../config/multer.js"
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/User.controller.js"

import express from 'express'
import { authenticate } from "../middleware/authenticate.js"


const UserRoute = express.Router()

UserRoute.use(authenticate)

UserRoute.get('/getuser/:userid', getUser)
UserRoute.put('/updateuser/:userid', upload.single('file') ,updateUser)
UserRoute.get('/get-all-user', getAllUser)
UserRoute.delete('/delete/:id', deleteUser)
export default UserRoute
