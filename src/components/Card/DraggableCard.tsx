import React from "react";
import { useDrag } from "react-dnd";
import Card, { CardProps } from "./Card";

type DraggableCardProps = {} & CardProps;

const DraggableCard = ({ value, ...rest }: DraggableCardProps) => {
  const [, drag] = useDrag(
    () => ({
      type: "card",
      item: { value },
    }),
    [value]
  );

  return (
    <div ref={drag}>
      <Card value={value} {...rest} />
    </div>
  );
};

export default DraggableCard;
