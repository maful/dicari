import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";
import { type JSONContent } from "@tiptap/react";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobPublicId = params.id;
  // get job id from database
  const job = await prisma.job.findUnique({
    where: { publicId: jobPublicId },
  });
  if (job === null) {
    return NextResponse.json(
      { message: "Job can't be found" },
      { status: 404 }
    );
  }

  const totalTest = await prisma.jobTest.count({ where: { jobId: job.id } });
  const jobTests = await prisma.jobTest.findMany({
    where: { jobId: job.id },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(jobTests, {
    headers: { "x-total-count": totalTest.toString() },
  });
}

type FormValues = {
  question: JSONContent;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const { question } = (await request.json()) as FormValues;

  // get job id from database
  const job = await prisma.job.findUnique({
    where: { publicId: jobId },
  });
  if (job === null) {
    return NextResponse.json(
      { message: "Job can't be found" },
      { status: 404 }
    );
  }

  try {
    const test = await prisma.jobTest.create({
      data: {
        question,
        jobId: job.id,
      },
    });
    return NextResponse.json(test, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to create test" },
      { status: 400 }
    );
  }
}
