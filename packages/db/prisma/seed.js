import prisma from '../index.js'

async function main() {
  await prisma.comment.createMany({
    data: [
      { content: 'Great documentation! Very helpful.' },
      { content: 'Can you add more examples?' },
      { content: 'This section needs clarification.' }
    ]
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })