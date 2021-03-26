import { Item } from '.prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { prisma } from '../app';

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        price: true,
        name: true,
        cellId: true,
        country: true,
        departureAt: true,
        equipmentId: true,
        expiresAt: true,
        supplyCode: true,
        status: true,
      },
    });

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
      data: {
        ...req.body,
        departureAt:
          (
            await prisma.item.findFirst({
              where: {
                supplyCode: req.body.supplyCode,
              },
            })
          )?.departureAt ?? new Date(),
      },
    });
    res.send(item);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const result: Item[] = [];
    for (const updateArgs of req.body) {
      result.push(
        await prisma.item.update({
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
