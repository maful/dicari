import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; testId: string } }
) {
  try {
    const testId = parseInt(params.testId, 10);
    await prisma.jobTest.delete({
      where: { id: testId },
    });

    return NextResponse.json({ deleted: true });
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to delete test question" },
      { status: 400 }
    );
  }
}
