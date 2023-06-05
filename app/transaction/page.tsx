"use client";

import React, { useMemo, useRef, useState } from "react";

import {
  MdMenu,
  MdSearch,
  MdSettings,
  MdOutlineAttachMoney,
  MdAdd,
} from "react-icons/md";
import DrawerComp from "@/components/Drawer";
import TransactionList, {
  TransactionListType,
} from "@/components/home/HomeTransactionList";
import HomeFooter from "@/components/home/HomeFooter";
import { useDrawerStore } from "@/store/useDrawerStore";
import { useDispatch } from "react-redux";
import { updateDrawer } from "@/redux/drawerSlice";
import { useQuery } from "react-query";
import axios from "axios";
import { transactionAllType } from "./transaction.types";
import _ from "lodash";
import numeral from "numeral";

const DATA = [
  {
    title: "01/01/2022",
    data: [
      {
        accName: "ใช้จ่าย",
        accTypeName: "เงินสด",
        accType: "expense",
        date: "02/01/2022",
        time: "12.00",
        amount: "500",
      },
    ],
  },
  {
    title: "02/01/2022",
    data: [
      {
        accName: "ใช้จ่าย",
        accTypeName: "เงินสด",
        accType: "expense",
        date: "03/01/2022",
        time: "12.00",
        amount: "500",
      },
      {
        accName: "ใช้จ่าย",
        accTypeName: "เงินสด",
        accType: "expense",
        date: "04/01/2022",
        time: "12.00",
        amount: "500",
      },
    ],
  },
];

export default function Transaction() {
  // const { setDrawer } = useDrawerStore();
  const dispatch = useDispatch();

  const { data: transactionAll } = useQuery({
    queryKey: ["transactionAll"],
    queryFn: () =>
      axios.post<transactionAllType[]>("/api/transaction/transactionAll", {
        profile_id: 1,
      }),
  });
  console.log(
    "🚀 ~ file: page.tsx:78 ~ Transaction ~ transactionAll:",
    transactionAll
  );

  const transactionList = useMemo(() => {
    const groupData = _.groupBy(transactionAll?.data, "date");
    let transactionList: TransactionListType[] = [];
    for (const [key, value] of Object.entries(groupData)) {
      transactionList.push({
        title: key,
        data: value.map((v) => ({
          accName: v.wallet_account.acc_name,
          accType: String(v.wallet_category.trans_type_id),
          cateName: v.wallet_category.cate_name,
          transTypeId: Number(v.wallet_category.trans_type_id),
          time: v.time,
          amount: String(v.trans_amount),
        })),
      });
    }
    return transactionList;
  }, [transactionAll]);

  const totalIncome: string = useMemo(() => {
    const total = transactionAll?.data
      .filter((trans) => trans.wallet_category.trans_type_id === 1)
      .reduce((p, c) => p + Number(c.trans_amount), 0);
    return numeral(total).format("0,0.00");
  }, [transactionAll]);

  const totalExpense: string = useMemo(() => {
    const total = transactionAll?.data
      .filter((trans) => trans.wallet_category.trans_type_id === 2)
      .reduce((p, c) => p + Number(c.trans_amount), 0);
    return numeral(total).format("0,0.00");
  }, [transactionAll]);

  return (
    <div className="bg-gray-200 ">
      <div className="grid grid-cols-6 bg-sky-900 text-white py-2 px-4 sticky top-0 z-10">
        <div className="col-span-1">
          <MdMenu
            className="text-3xl cursor-pointer"
            onClick={() => {
              // setDrawer(true);
              dispatch(updateDrawer(true));
            }}
          />
        </div>
        <div className="col-span-4 flex justify-between items-center">
          <div>
            <MdSearch className="text-3xl" />
          </div>
          <div>
            <span>เดือนนี้</span>
          </div>
          <div></div>
        </div>
        <div className="col-span-1 flex justify-end">
          <MdSettings className="text-3xl" />
        </div>
      </div>

      <TransactionList data={transactionList} />

      <HomeFooter totalIncome={totalIncome} totalExpense={totalExpense} />
    </div>
  );
}
