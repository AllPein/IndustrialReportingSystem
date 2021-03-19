import Joi from 'joi'

export const login = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(5).required()
})