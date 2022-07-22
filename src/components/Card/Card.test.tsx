import { render, screen } from "@testing-library/react";
import React from "react";
import Card from "./Card";

it("has the value", () => {
  render(<Card value={1} />);

  expect(screen.getByTestId("value")).toHaveTextContent("1");
});
