import { render, screen } from "@testing-library/react";
import HomePage from "./page";

jest.mock("next/navigation", () => require("next-router-mock"));

test("home test", () => {
  render(<HomePage />);
  const textMonth = screen.getByText("เดือนนี้");
  expect(textMonth).toBeInTheDocument();
});
