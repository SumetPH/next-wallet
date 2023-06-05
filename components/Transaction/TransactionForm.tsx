"use client";

import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdSave } from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "react-query";
import axios from "axios";
import { AccountAll } from "@/app/api/account/accountAll/route";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import numeral from "numeral";

type Props = {
  title: string;
};

type FormData = {
  amount: number;
  acc_id: string;
  cate_id: string;
  dateTime: Date;
  note: string;
};

export default function TransactionForm({ title }: Props) {
  const router = useRouter();
  const amountRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      amount: 0,
      acc_id: "",
      dateTime: new Date(),
    },
  });

  const { data: accountAll } = useQuery({
    queryKey: ["accountAll"],
    queryFn: () =>
      axios.post<AccountAll[]>("/api/account/accountAll", {
        profile_id: 1,
      }),
  });
  console.log(
    "🚀 ~ file: TransactionForm.tsx:25 ~ TransactionForm ~ accountAll:"
  );

  const submit = async (data: FormData) => {
    const res = await axios.post("/api/transaction/transactionCreate", {
      acc_id: Number(data.acc_id),
      trans_type_id: 1,
      trans_amount: data.amount,
      trans_date: data.dateTime.toISOString(),
      trans_note: data.note,
    });
    if (res.status === 200) {
      reset();
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white h-screen">
      <div
        className={`
          grid grid-cols-6 py-3 px-1 text-white
          ${title === "รายจ่าย" ? "bg-red-600" : "bg-green-600"}
        `}
      >
        <div className="col-span-1">
          <MdArrowBack
            size={30}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
        <div className="col-span-4">
          <h1 className="text-center text-lg font-bold">{title}</h1>
        </div>
        <div className="col-span-1 flex justify-end">
          <button type="submit">
            <MdSave size={30} />
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between px-2 py-3 border-b">
          <section className="text-sm text-gray-500 basis-[50px]">
            จำนวน
          </section>
          <section className="flex items-center">
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <NumericFormat
                  value={field.value}
                  className="focus:outline-none text-right mr-1 text-xl font-bold"
                  allowLeadingZeros
                  thousandSeparator=","
                  onValueChange={(values) => field.onChange(values.floatValue)}
                />
              )}
            />
            <span>บาท</span>
          </section>
        </div>
        <div className="grid grid-cols-2 border-b">
          <section className="flex justify-center py-4 border-r">
            <select {...register("acc_id")} className="focus:outline-none">
              <option value="" disabled>
                เลือกบัญชี
              </option>
              {accountAll &&
                accountAll.data.map((account) => (
                  <option key={account.acc_id} value={account.acc_id}>
                    {account.acc_name}
                    {" : "}
                    {numeral(account.total).format("0,0.00")}
                  </option>
                ))}
            </select>
          </section>
          <section className="flex justify-center py-4 border-l">
            <select className="focus:outline-none">
              <option value="" disabled defaultValue="">
                เลือกหมวดหมู่
              </option>
              <option value="1">ใช้จ่าย</option>
              <option value="2">ใช้จ่าย</option>
              <option value="3">ใช้จ่าย</option>
            </select>
          </section>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-b">
          <section className="text-sm text-gray-500 basis-[100px]">
            วันและเวลา
          </section>
          <section>
            <Controller
              control={control}
              name="dateTime"
              render={({ field }) => (
                <DatePicker
                  className="focus:outline-none"
                  selected={field.value}
                  onChange={(date) => {
                    if (date) field.onChange(date);
                  }}
                  timeInputLabel="Time :"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeInput
                />
              )}
            />
          </section>
        </div>
        <div className="flex items-center justify-between px-2 py-3 border-b">
          <section className="text-sm text-gray-500 basis-[100px]">
            บันทึก
          </section>
          <section className="w-full">
            <textarea
              className="w-full p-2 focus:outline-sky-800"
              rows={4}
            ></textarea>
          </section>
        </div>
      </div>
    </form>
  );
}
