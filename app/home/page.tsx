"use client";

import React, { useRef, useState } from "react";

import {
  MdMenu,
  MdSearch,
  MdSettings,
  MdOutlineAttachMoney,
  MdAdd,
} from "react-icons/md";
import DrawerComp from "@/components/Drawer";
import TransactionList from "@/components/home/HomeTransactionList";
import HomeFooter from "@/components/home/HomeFooter";
import { useDrawerStore } from "@/store/useDrawerStore";

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

export default function Home() {
  const { setDrawer } = useDrawerStore();

  return (
    <div className="bg-gray-200 ">
      <div className="grid grid-cols-6 bg-sky-900 text-white py-2 px-4 sticky top-0 z-10">
        <div className="col-span-1">
          <MdMenu
            className="text-3xl cursor-pointer"
            onClick={() => setDrawer(true)}
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

      <TransactionList data={DATA} />

      <HomeFooter />
    </div>
  );
}
