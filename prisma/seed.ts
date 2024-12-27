const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')

const prisma = new PrismaClient()

async function main() {
  // 테스트 유저 생성
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@zod.com",
      password: "12345678910",
    },
  })

  // 100개의 트윗 생성
  const tweets = Array(100).fill(null).map(() => ({
    tweet: faker.lorem.sentence(),
    userId: user.id,
    created_at: faker.date.past(),
  }))

  await prisma.tweet.createMany({
    data: tweets,
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 