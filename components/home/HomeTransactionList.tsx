import Link from "next/link";
import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

type Data = {
  accName: string;
  accType: string;
  accTypeName: string;
  date: string;
  time: string;
  amount: string;
};

export type DetailList = {
  title: string;
  data: Data[];
};

type Props = {
  data: DetailList[];
};

export default function TransactionList({ data }: Props) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <div className="bg-gray-300 py-1 px-2 text-sm font-medium sticky top-[46px]">
            <span data-testid="acc-title">{item.title}</span>
          </div>
          {item.data.map((d, index) => (
            <div key={index}>
              <Link href="/transaction">
                <div className="bg-white p-3 flex items-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex justify-center items-center flex-shrink-0">
                    <MdOutlineAttachMoney size={30} color="#fff" />
                  </div>
                  <div className="ml-2 flex justify-between items-center basis-full">
                    <div>
                      <section data-testid="acc-name-title">
                        {d.accName} {d.accTypeName}
                      </section>
                      <section
                        data-testid="acc-time"
                        className="text-sm text-gray-500"
                      >
                        {d.time}
                      </section>
                    </div>
                    <div>
                      <span data-testid="acc-amount" className="text-red-500">
                        {d.accType === "expense" ? "-" : "+"} {d.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <hr />
            </div>
          ))}
        </div>
      ))}
      <div className="bg-white h-10 w-full"></div>
    </>
  );
}
