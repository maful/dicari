import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId1 = "eea40371-c8f7-4994-961d-0226c560a540";
const userId2 = "0b7c857e-4ff3-4a07-9e0e-1fba5e8e60d5";

const jobs: Prisma.Enumerable<Prisma.JobCreateManyInput> = [
  {
    email: "contact@example.com",
    title: "Junior JavaScript Developer",
    userId: userId1,
    paused: true,
    pausedAt: new Date(),
  },
  {
    email: "contact@example.com",
    title: "Junior Ruby Developer",
    userId: userId1,
    closed: true,
    closedAt: new Date(),
  },
  {
    email: "contact@example.com",
    title: "Junior Pyhton Developer",
    userId: userId1,
  },
  {
    email: "contact@example.com",
    title: "Junior Swift Developer",
    userId: userId1,
  },
  {
    email: "contact@example.com",
    title: "Junior Go Developer",
    userId: userId1,
  },
  {
    email: "contact@example.com",
    title: "Senior Go Developer",
    userId: userId2,
  },
];

async function main() {
  const { count: jobsCount } = await prisma.job.createMany({
    data: jobs,
  });
  console.log(`${jobsCount} jobs created`);
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
