import Link from "next/link";
import numeral from "numeral";
import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

type Data = {
  accName: string;
  accType: string;
  cateName: string;
  transTypeId: number;
  time: string;
  amount: string;
};

export type TransactionListType = {
  title: string;
  data: Data[];
};

type Props = {
  data: TransactionListType[];
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
                  <div
                    className={`
                    w-10 h-10 rounded-full flex justify-center items-center flex-shrink-0
                    ${d.transTypeId === 1 ? "bg-green-500" : "bg-red-500"}
                  `}
                  >
                    <MdOutlineAttachMoney size={30} color="#fff" />
                  </div>
                  <div className="ml-2 flex justify-between items-center basis-full">
                    <div>
                      <section data-testid="acc-name-title">
                        {d.accName} {d.cateName}
                      </section>
                      <section
                        data-testid="acc-time"
                        className="text-sm text-gray-500"
                      >
                        {d.time}
                      </section>
                    </div>
                    <div>
                      <span
                        data-testid="acc-amount"
                        className={`
                        ${
                          d.transTypeId === 1
                            ? "text-green-500"
                            : "text-red-500"
                        }
                        `}
                      >
                        {d.transTypeId === 1 ? "+" : "-"}{" "}
                        {numeral(d.amount).format("0,0.00")}
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
      <div className="bg-white h-24 w-full"></div>
    </>
  );
}
