import { Equipment } from '.prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { prisma } from '../app';

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.equipment.findMany({
      include: {
        items: true,
        pavilion: true
      },
    });
    for (const cell of items) {
      cell.items = cell.items.filter((i) => i.status == 'SENT')
    }
    res.send(items);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const findUnique: RequestHandler = async (req, res) => {
  const result = await prisma.equipment.findUnique({
    where: {
      id: req.params['id'],
    },
  });
  res.send(result);
};

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await prisma.equipment.create({
      data: req.body,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const result: Equipment[] = [];
    for (const updateArgs of req.body) {
      console.log(updateArgs)
      result.push(
        await prisma.equipment.update({
          where: {
            id: updateArgs.id,
          },
          data: {
            ...updateArgs,
            id: undefined,
          },
          include: {
            pavilion: true,
            items: true
          }
        })
      );
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
