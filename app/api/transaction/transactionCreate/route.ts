import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export const transactionCreate = z.object({
  acc_id: z.number(),
  trans_type_id: z.number(),
  trans_amount: z.number(),
  trans_date: z.string().datetime(),
  trans_note: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = transactionCreate.parse(await req.json());

    const createTransaction = await prisma.wallet_transaction.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(createTransaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
