import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user?.id;

  const searchParams = request.nextUrl.searchParams;
  const start = parseInt(searchParams.get("_start") ?? "0", 10);
  const end = parseInt(searchParams.get("_end") ?? "10", 10);

  const totalJobs = await prisma.job.count({ where: { userId } });
  const jobs = await prisma.job.findMany({
    where: { userId },
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
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase.auth.getSession();
    const userId = data?.session?.user?.id;

    const body = await request.json();
    const job = await prisma.job.create({
      data: { ...body, userId },
    });
    return NextResponse.json(job, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to create job" },
      { status: 400 }
    );
  }
}
