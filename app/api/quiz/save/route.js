import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { score, total_questions, percentage, level, message } = await request.json();

    const quizResult = await prisma.quizResult.create({
      data: {
        userId: parseInt(session.user.id),
        score,
        totalQuestions: total_questions,
        percentage,
        level,
        message,
      },
    });

    return NextResponse.json(
      { message: "Quiz result saved successfully", data: quizResult },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quiz Save Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
