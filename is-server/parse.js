const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function main() {
  const contents = fs.readFileSync('./data.json', {encoding: 'utf8',})
  const data = JSON.parse(contents)
  console.log(data[0])
  for (const country of data) {
    await prisma.create({
        data: {
            name: country['name'],
            code: 
        }
    })
  }
}

main().then(() => {
  prisma.$disconnect()
})