// scripts/seed.js
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'C' },
        { name: 'C++' },
        { name: 'Java' },
        { name: 'C#' },
      ],
    });
    console.log('Success');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
