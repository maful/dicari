import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(jobs);
}
