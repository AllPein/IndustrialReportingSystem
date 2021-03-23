import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

const createUser = async () => {
  await prisma.user.create({
    data: {
      username: 'Artur',
      password: '12345',
      role: 'EMPLOYEE',
    },
  });
  await prisma.user.create({
    data: {
      username: 'Andrey',
      password: '12345',
      role: 'ADMIN',
    },
  });
  await prisma.user.create({
    data: {
      username: 'Alexandr',
      password: '12345',
      role: 'MANAGER',
    },
  });
};

const createItem = async () => {
  await prisma.item.create({
    data: {
      country: 'Russia',
      cell: {
        create: {
          code: 'ABCD',
        },
      },
      group: {
        create: {
          checkNumber: 10,
          code: 'ABCD',
          name: 'Flex',
        },
      },
      equipment: {
        create: {
          code: 'ABCD',
          name: 'Machine',
          pavilion: {
            create: {
              code: 'ABCD',
              address: 'pushkina',
            },
          },
        },
      },
      price: 23.3,
      status: 'SENT',
      supplyCode: 'ABCD',
      expiresAt: new Date(),
      departureAt: new Date(),
    },
  });
};

const main = async () => {
  await createUser()
  await createItem()
}

main().then(() => {
  prisma.$disconnect()
})
