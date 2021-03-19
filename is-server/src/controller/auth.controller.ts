import { User } from '.prisma/client'
import { RequestHandler } from 'express'
import { UNAUTHORIZED } from 'http-status'
import jwt from 'jsonwebtoken'
import { prisma } from '../app'

export const login: RequestHandler = async (req, res) => {
  const { email: username, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      username,
      password
    }
  })
  if (!user) {
    res.status(UNAUTHORIZED).send({ message: 'wrong credentials' })
  }
  const token = generateTokens(user)
  res.send({
    user,
    token
  })
}

const generateTokens = (user: User, secret = 'sex') => {
  return jwt.sign({
    sub: {
      id: user.id
    }
  }, secret, {
    expiresIn: 60 * 60 * 10
  })
}