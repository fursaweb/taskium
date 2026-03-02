import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const deleteResult = await prisma.task.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (deleteResult.count === 0) {
      return NextResponse.json({ error: "Task not found", status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
