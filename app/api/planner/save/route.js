import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const lifePlan = await prisma.lifePlan.upsert({
      where: { userId: parseInt(session.user.id) },
      update: { data: data },
      create: {
        userId: parseInt(session.user.id),
        data: data,
      },
    });

    return NextResponse.json(
      { success: true, message: "Plan saved successfully", data: lifePlan },
      { status: 201 }
    );
  } catch (error) {
    console.error("Planner Save Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
