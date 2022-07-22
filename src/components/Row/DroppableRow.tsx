import React from "react";
import { useDrop } from "react-dnd";
import { Card as CardModel } from "../../models";
import Row, { RowProps } from "./Row";

export type DroppableRowProps = {
  onDrop: (card: CardModel) => void;
} & RowProps;

export const DroppableRow = ({ onDrop, row, ...rest }: DroppableRowProps) => {
  const [, drop] = useDrop<{ value: number }>({
    accept: "card",
    canDrop: ({ value }) => row.isValid(new CardModel(value)),
    drop: ({ value }) => onDrop(new CardModel(value)),
  });

  return (
    <div ref={drop}>
      <Row row={row} {...rest} />
    </div>
  );
};
