import { RequestHandler } from "express";
import httpStatus from "http-status";
import { prisma } from "../app";

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.group.findMany()
    res.send(items)
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export const findUnique: RequestHandler = async (req, res) => {
  const group = await prisma.group.findUnique({
    where: {
      id: req.params['id']
    }
  })
  res.send(group)
}

export const create: RequestHandler = async (req, res) => {
  try {
    const group = await prisma.group.create({
      data: req.body
    })
    res.send(group)
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.BAD_REQUEST)
  }
}