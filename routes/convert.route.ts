import express from 'express'

import convertController from '../controllers/convert.controller.js'

const convertRouter = express.Router()

convertRouter.post('/', convertController.convertAtoB)

export default convertRouter