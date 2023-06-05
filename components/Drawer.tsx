import { useDrawerStore } from "@/store/useDrawerStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import {
  MdAccountBalance,
  MdCalendarViewMonth,
  MdCategory,
  MdHome,
  MdMoney,
  MdPerson,
  MdSettings,
} from "react-icons/md";

export default function DrawerComp() {
  const { drawer, setDrawer } = useDrawerStore();
  const router = useRouter();

  const closeDrawer = () => {
    setDrawer(false);
  };

  const changeRoute = (path: string) => {
    router.push(path);
    setDrawer(false);
  };

  return (
    <div
      className={`
        fixed inset-0 
        w-screen h-screen
        overflow-hidden
        transition duration-200
        z-50
        ${drawer ? "translate-x-0" : "-translate-x-full"}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeDrawer();
        }
      }}
    >
      <div className="relative w-[70%] lg:w-[20%] bg-sky-800 shadow text-white h-full overflow-y-auto">
        <h1 className="text-xl font-medium text-center my-4">Next Wallet</h1>
        <ul>
          <li
            className="flex items-center px-3 py-2 hover:bg-sky-700 cursor-pointer"
            onClick={() => changeRoute("/home")}
          >
            <MdHome size={30} />
            <span className="ml-2">หน้าหลัก</span>
          </li>
          <li
            className="flex items-center px-3 py-2 hover:bg-sky-700 cursor-pointer"
            onClick={() => changeRoute("/account")}
          >
            <MdAccountBalance size={30} />
            <span className="ml-2">บัญชี</span>
          </li>
          <li className="flex items-center px-3 py-2 hover:bg-sky-700 cursor-pointer">
            <MdCategory size={30} />
            <span className="ml-2">หมวดหมู่</span>
          </li>
          <li className="flex items-center px-3 py-2 hover:bg-sky-700 cursor-pointer">
            <MdMoney size={30} />
            <span className="ml-2">งบประมาณ</span>
          </li>
          <li className="flex items-center px-3 py-2 hover:bg-sky-700 cursor-pointer">
            <MdCalendarViewMonth size={30} />
            <span className="ml-2">รายการประจำ</span>
          </li>
        </ul>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="p-2">
            <section className="text-sm text-gray-300">ทรัพย์สินสุทธิ</section>
            <section className="font-bold">150,000.50 บาท</section>
          </div>
          <hr className="border-gray-500" />
          <div className="flex justify-between items-center px-2 pt-2 pb-6">
            <section className="flex items-center">
              <MdPerson size={24} />
              <span>โปรไฟล์หลัก</span>
            </section>
            <section>
              <MdSettings size={30} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
