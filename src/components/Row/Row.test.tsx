import { render, screen } from "@testing-library/react";
import React from "react";
import { AscendingRow, Card, DescendingRow } from "../../models";
import Row from "./Row";

const ascendingRow = new AscendingRow(new Card(1));
const descendingRow = new DescendingRow(new Card(100));

it("generates the correct test id", () => {
  render(
    <Row direction="descending" index={2} row={descendingRow}>
      <div />
    </Row>
  );

  expect(screen.getByTestId("row-descending-2")).toBeInTheDocument();
});

describe("direction modifiers", () => {
  it("adds the ascending direction modifier", () => {
    render(
      <Row direction="ascending" row={ascendingRow}>
        <div />
      </Row>
    );

    expect(screen.getByTestId("row-ascending-1")).toHaveClass("Row--ascending");
  });

  it("adds the descending direction modifier", () => {
    render(
      <Row direction="descending" row={descendingRow}>
        <div />
      </Row>
    );

    expect(screen.getByTestId("row-descending-1")).toHaveClass(
      "Row--descending"
    );
  });
});
