import { fireEvent, render, screen } from "@testing-library/react";
import HomeFooter from "./HomeFooter";

jest.mock("next/navigation", () => require("next-router-mock"));

test("HomeFooter test", async () => {
  render(<HomeFooter />);

  const incomeTitle = screen.getByTestId("income-title");
  expect(incomeTitle.textContent).toBe("รายรับรวม");

  const expenseTitle = screen.getByTestId("expense-title");
  expect(expenseTitle.textContent).toBe("รายจ่ายรวม");

  // check menu
  const menu = screen.getByTestId("menu");
  expect(menu.classList.contains("scale-0")).toBeTruthy();

  // show menu after click menu button
  const btnMenu = screen.getByTestId("btn-menu");
  fireEvent.click(btnMenu);
  expect(menu.classList.contains("scale-100")).toBeTruthy();
});
