import { Cell } from '.prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { prisma } from '../app';

export const findMany: RequestHandler = async (req, res) => {
  try {
    const cells = await prisma.cell.findMany({
      include: {
        items: true,
      },
    });
    for (const cell of cells) {
      cell.items = cell.items.filter((i) => i.status == 'INSTOCK')
    }
    res.send(cells);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const findUnique: RequestHandler = async (req, res) => {
  const result = await prisma.cell.findUnique({
    where: {
      id: req.params['id'],
    },
    include: {
      items: true,
    },
  });
  res.send(result);
};

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await prisma.cell.create({
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
    const result: Cell[] = [];
    for (const updateArgs of req.body) {
      result.push(
        await prisma.cell.update({
          where: {
            id: updateArgs.id,
          },
          data: {
            ...updateArgs,
            id: undefined,
          },
        })
      );
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
};
