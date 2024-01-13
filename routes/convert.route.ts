import express from 'express'
import multer from 'multer'

import convertController from '../controllers/convert.controller.js'

const upload = multer({ storage: multer.memoryStorage() })

const convertRouter = express.Router()

convertRouter.post('/', upload.array('images', 999), convertController.convertImageFormat)

export default convertRouter