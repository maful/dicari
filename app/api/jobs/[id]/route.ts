import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const publicId = params.id;
    const job = await prisma.job.findUniqueOrThrow({
      where: { publicId },
    });

    return NextResponse.json(job);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      { message: "Unable to get the job" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const job = await prisma.job.update({
      where: { publicId: params.id },
      data: body,
    });
    return NextResponse.json(job);
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to update job" },
      { status: 400 }
    );
  }
}
