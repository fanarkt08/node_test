import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../app.js";

const saltRounds = 10;

const woods = [
  { name: "Épicéa", type: "softwood" as const, hardness: "tender" as const },
  { name: "Pin", type: "softwood" as const, hardness: "medium_hard" as const },
  { name: "Padouk", type: "exotic_wood" as const, hardness: "hard" as const },
  { name: "Érable", type: "noble_and_hardwoods" as const, hardness: "medium_hard" as const },
  { name: "Hêtre", type: "noble_and_hardwoods" as const, hardness: "medium_hard" as const },
  { name: "Itauba", type: "exotic_wood" as const, hardness: "hard" as const },
  { name: "Douglas", type: "softwood" as const, hardness: "tender" as const },
];

async function main() {
  for (const wood of woods) {
    await prisma.wood.upsert({
      where: { name: wood.name },
      update: {},
      create: wood,
    });
  }

  const hashedPassword = await bcrypt.hash("password123", saltRounds);

  await prisma.user.upsert({
    where: { email: "john.doe@test.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
      password: hashedPassword,
    },
  });

  console.log("Seeding done.");
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