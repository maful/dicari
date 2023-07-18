import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";
import { type JSONContent } from "@tiptap/react";

type FormValues = {
  question: JSONContent;
  jobId: string;
};

export async function POST(request: NextRequest) {
  const { question, jobId } = (await request.json()) as FormValues;

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
