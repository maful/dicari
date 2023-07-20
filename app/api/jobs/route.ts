import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start = parseInt(searchParams.get("_start") ?? "0", 10);
  const end = parseInt(searchParams.get("_end") ?? "10", 10);

  const totalJobs = await prisma.job.count();
  const jobs = await prisma.job.findMany({
    orderBy: { id: "desc" },
    skip: start,
    take: end - start,
  });

  return NextResponse.json(jobs, {
    headers: { "x-total-count": totalJobs.toString() },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const job = await prisma.job.create({
      data: { ...body },
    });
    return NextResponse.json(job, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to create job" },
      { status: 400 }
    );
  }
}
