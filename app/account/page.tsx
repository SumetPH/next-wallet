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
// import { useAppDispatch } from "@/redux/store";
import { updateDrawer } from "@/redux/drawerSlice";
import { useDispatch } from "react-redux";

const DATA = [
  {
    title: "กระเป๋า",
    data: [
      {
        accName: "เงินสด",
        amount: "500",
      },
    ],
  },
];

export default function Account() {
  // const { setDrawer } = useDrawerStore();
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-200 ">
      <div className="grid grid-cols-6 bg-sky-900 text-white py-2 px-4 sticky top-0 z-10">
        <div className="col-span-1">
          <MdMenu
            className="text-3xl cursor-pointer"
            onClick={() => {
              // setDrawer(true)
              console.log("first");
              dispatch(updateDrawer(true));
            }}
          />
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <span>บัญชี</span>
        </div>
        <div className="col-span-1 flex justify-end">
          <MdSettings className="text-3xl" />
        </div>
      </div>
    </div>
  );
}
