import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { format } from "date-fns";

export async function POST(req: Request) {
  try {
    const transactionCreate = z.object({
      profile_id: z.number().optional(),
      acc_id: z.number().optional(),
    });

    const body = transactionCreate.parse(await req.json());

    const transactionAll = await prisma.wallet_transaction.findMany({
      where: {
        profile_id: body.profile_id,
        acc_id: body.acc_id,
      },
      include: {
        wallet_account: true,
        wallet_category: {
          include: {
            wallet_transaction_type: true,
          },
        },
      },
      orderBy: {
        trans_date: "desc",
      },
    });

    const data = transactionAll.map((trans) => ({
      ...trans,
      date: trans.trans_date ? format(trans.trans_date, "dd-MM-yyyy") : null,
      time: trans.trans_date ? format(trans.trans_date, "HH.mm") : null,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
