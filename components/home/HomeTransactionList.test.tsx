import { render, screen } from "@testing-library/react";
import HomeTransactionList, { DetailList } from "./HomeTransactionList";

const mockData: DetailList[] = [
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
      {
        accName: "เงินเดือน",
        accTypeName: "เงินสด",
        accType: "income",
        date: "02/01/2022",
        time: "12.00",
        amount: "500",
      },
    ],
  },
];

test("check props value", () => {
  render(<HomeTransactionList data={mockData} />);
  const titleText = screen.getAllByTestId("acc-title");
  expect(titleText[0].textContent).toBe("01/01/2022");

  const accNameTitle = screen.getAllByTestId("acc-name-title");
  expect(accNameTitle[0].textContent).toBe("ใช้จ่าย เงินสด");

  const accTime = screen.getAllByTestId("acc-time");
  expect(accTime[0].textContent).toBe("12.00");

  const accAmount = screen.getAllByTestId("acc-amount");
  // expense
  expect(accAmount[0].textContent).toBe("- 500");
  // income
  expect(accAmount[1].textContent).toBe("+ 500");
});
