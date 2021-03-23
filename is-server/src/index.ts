import app, { prisma } from './app'

const port = process.env.PORT || 3000

const server = app.listen(port, () => console.log(`server started at http://localhost:${port}`))

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
  prisma.$disconnect()
});

interface Item {
  id: string,
  name: string
}

type Editable<T> = {
  [key in keyof T]: T[key] | Element
}

type EditableItem = Editable<Item>