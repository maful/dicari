import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jobs: Prisma.Enumerable<Prisma.JobCreateManyInput> = [
  {
    email: "contact@example.com",
    title: "Junior JavaScript Developer",
    paused: true,
    pausedAt: new Date(),
  },
  {
    email: "contact@example.com",
    title: "Junior Ruby Developer",
    closed: true,
    closedAt: new Date(),
  },
  {
    email: "contact@example.com",
    title: "Junior Pyhton Developer",
  },
  {
    email: "contact@example.com",
    title: "Junior Swift Developer",
  },
  {
    email: "contact@example.com",
    title: "Junior Go Developer",
  },
  {
    email: "contact@example.com",
    title: "Senior Go Developer",
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
