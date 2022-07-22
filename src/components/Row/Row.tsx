import clsx from "clsx";
import React from "react";
import { Row as RowModel } from "../../models";
import Card from "../Card/Card";
import styles from "./Row.module.scss";

export type RowProps = {
  row: RowModel;
  index?: 1 | 2;
  direction: "ascending" | "descending";
};

const Row = ({ direction, index = 1, row }: RowProps) => {
  return (
    <div
      className={clsx(styles.Row, styles[`Row--${direction}`])}
      data-testid={`row-${direction}-${index}`}
    >
      {row.getCards().map((card) => (
        <Card key={card.getValue()} value={card.getValue()} />
      ))}
    </div>
  );
};

export default Row;
