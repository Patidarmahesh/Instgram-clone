import express from 'express'
import userAuth from '../middleware/isAuthenticated.js'
import { createMessage, getMessage } from '../controllers/message.controller.js'

const messageRoute = express.Router()

messageRoute.route("/send/:id").post(userAuth,createMessage)
messageRoute.route("/get/:id").get(userAuth,getMessage)

export default messageRoute