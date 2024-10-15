import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const coachResult = await prisma.coach.createMany({
    data: [
      {
        name: "Tanya P",
        phoneNumber: "631-555-1111",
      },
      {
        name: "Christopher Jativa",
        phoneNumber: "631-555-2222",
      },
      {
        name: "Franklin V",
        phoneNumber: "631-555-3333",
      },
    ],
  });
  const studentResult = await prisma.student.createMany({
    data: [
      {
        name: "Jeremy J",
        phoneNumber: "631-444-1111",
      },
      {
        name: "Dylan A",
        phoneNumber: "631-444-2222",
      },
      {
        name: "Camila P",
        phoneNumber: "631-444-3333",
      },
    ],
  });

  console.log(`
    [seed] Created ${coachResult.count} Coach records
    [seed] Created ${studentResult.count} Student records
    `);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
