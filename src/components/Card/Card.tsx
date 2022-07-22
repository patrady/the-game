import React from "react";
import styles from "./Card.module.scss";

export type CardProps = {
  value: number;
};

function Card({ value }: CardProps) {
  return (
    <div className={styles.Card} data-testid="value">
      {value}
    </div>
  );
}

export default Card;
