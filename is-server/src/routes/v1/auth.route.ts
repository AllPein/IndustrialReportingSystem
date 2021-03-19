import express from 'express'
import { validate } from '../../middlewares/validate'
import * as authValidation from '../../validation/auth.validation'
import * as authController from '../../controller/auth.controller'

const router = express.Router()

router.post('/login', validate(authValidation.login), authController.login)

export default router