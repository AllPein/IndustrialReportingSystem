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

const test = async () => {
  const d = await prisma.equipment.create({
    data: {
      code: '1242',
      name: '12324',
      pavilion: {
        connect: {
          code: 'A1'
        }
      }
    }
  })
  await prisma.equipment.update({
    where: {
      id: d.id,
    },
    data: {
      // ...updateArgs,
      pavilion: {
        connect: {
          code: 'A2'
        }
      },
      id: undefined,
    },
    include: {
      pavilion: true
    }
  })
}

const createCells = async () => {
  const alph = ['A', 'B']
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  for (const letter of alph) {
    for (const number of num) {
      await prisma.cell.create({
        data: {
          code: `${letter}${number}`
        }
      })
    }
  }
}

const createPvilion = async () => {
  await prisma.pavilion.create({
    data: {
      code: 'A1',
      address: 'ул. Попова, 18А'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'A2',
      address: 'ул. Попова, 20'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'A3',
      address: 'ул. Попова, 22'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'A4',
      address: 'ул. Попова, 24'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'A5',
      address: 'ул. Попова, 26'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'A6',
      address: 'ул. Попова, 28'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'B1',
      address: 'ул. Луначарского, 53'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'B2',
      address: 'ул. Луначарского, 55'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'B3',
      address: 'ул. Луначарского, 57'
    },
  });
  await prisma.pavilion.create({
    data: {
      code: 'B4',
      address: 'ул. Луначарского, 59'
    },
  });
};

const main = async () => {
  await createUser()
  await createCells()
  await createPvilion()
}

main().then(() => {
  prisma.$disconnect()
})
