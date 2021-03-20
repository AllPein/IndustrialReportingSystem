import { Prisma, User } from '.prisma/client'
import { RequestHandler } from 'express'
import { UNAUTHORIZED } from 'http-status'
import jwt from 'jsonwebtoken'
import { prisma } from '../app'
import { generateTokens } from '../services/token'

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      username,
      password
    },
    select: {
      password: false,
      role: true,
      username: true
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

