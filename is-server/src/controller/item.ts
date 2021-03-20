import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { prisma } from '../app';

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.send(items);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const findUnique: RequestHandler = async (req, res) => {
  const item = await prisma.item.findUnique({
    where: {
      id: req.params['id'],
    },
  });
  res.send(item);
};

export const create: RequestHandler = async (req, res) => {
  try {
    const item = await prisma.item.create({
      data: req.body,
    });
    console.log(item);
    res.send(item);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
