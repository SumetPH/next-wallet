import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const transactionCreate = z.object({
      profile_id: z.number(),
    });
    const body = transactionCreate.parse(await req.json());

    const cateIncome = await prisma.wallet_category.findMany({
      where: {
        profile_id: body.profile_id,
        trans_type_id: 1,
      },
    });

    const cateExpense = await prisma.wallet_category.findMany({
      where: {
        profile_id: body.profile_id,
        trans_type_id: 2,
      },
    });

    return NextResponse.json({
      cateIncome,
      cateExpense,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
