import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export interface AccountAll {
  acc_id: number;
  acc_name: string;
  acc_note: string | null;
  profile_id: number;
  income: string;
  expense: string;
  total: string;
}

export async function POST(req: Request) {
  try {
    const bodySchema = z.object({
      profile_id: z.number(),
    });
    const body = bodySchema.parse(await req.json());

    const accountAll: AccountAll[] = await prisma.$queryRaw`
      select wa.acc_id, wa.acc_name, wa.acc_note, wa.profile_id,
      coalesce((
        select sum(wwtt.trans_amount) from wallet_transaction wwtt
        WHERE wwtt.acc_id = wa.acc_id and wwtt.trans_type_id = 1
        GROUP BY wwtt.trans_type_id
      ),0) income,
      coalesce((
        select sum(wwtt.trans_amount) from wallet_transaction wwtt
        WHERE wwtt.acc_id = wa.acc_id and wwtt.trans_type_id = 2
        GROUP BY wwtt.trans_type_id
      ),0) expense,
      (
        coalesce((
          select sum(wwtt.trans_amount) from wallet_transaction wwtt
          WHERE wwtt.acc_id = wa.acc_id and wwtt.trans_type_id = 1
          GROUP BY wwtt.trans_type_id
        ),0)
        - 
        coalesce((
          select sum(wwtt.trans_amount) from wallet_transaction wwtt
          WHERE wwtt.acc_id = wa.acc_id and wwtt.trans_type_id = 2
          GROUP BY wwtt.trans_type_id
        ),0)
      ) total
      from wallet_account wa
      where wa.profile_id = ${body.profile_id}
    `;

    return NextResponse.json(accountAll);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
