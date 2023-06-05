import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAdd } from "react-icons/md";

type Props = {
  totalIncome: string;
  totalExpense: string;
};

export default function HomeFooter({
  totalIncome = "0.00",
  totalExpense = "0.00",
}: Props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="grid grid-cols-3 text-sm">
        <div
          data-testid="income-title"
          className="text-center bg-sky-800 text-gray-300 rounded-tr-full"
        >
          รายรับรวม
        </div>
        <div className="relative">
          <div
            data-testid="btn-menu"
            className="
            absolute 
            left-0 
            right-0
            m-auto 
            w-12 h-12 
            bg-yellow-500 
            border-2 
            border-sky-800 
            rounded-full 
            flex 
            justify-center 
            items-center
          "
            onClick={() => setShowMenu(!showMenu)}
          >
            <MdAdd size={30} className="text-sky-800" />
          </div>
          <div
            data-testid="menu"
            className={`
          bg-sky-800  absolute -left-[20%] -right-[20%] -top-10 rounded-md
            transition duration-50
            ${showMenu ? "scale-100" : "scale-0"}
          `}
          >
            <div className="grid grid-cols-2 p-2">
              <div
                className="text-center text-white cursor-pointer"
                onClick={() => router.push("/transaction/income")}
              >
                รายรับ
              </div>
              <div
                className="text-center text-white cursor-pointer"
                onClick={() => router.push("/transaction/expense")}
              >
                รายจ่าย
              </div>
            </div>
          </div>
        </div>
        <div
          data-testid="expense-title"
          className="text-center bg-sky-800 text-gray-300 rounded-tl-full"
        >
          รายจ่ายรวม
        </div>
      </div>
      <div className="grid grid-cols-2 px-2 pb-6 bg-sky-800 text-white">
        <div className="text-start">{totalIncome} บาท</div>
        <div className="text-end">{totalExpense} บาท</div>
      </div>
    </div>
  );
}
