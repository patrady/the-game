import { Card } from "./Card";

export abstract class Row {
  cards: Card[] = [];

  constructor(initialCard: Card) {
    this.cards.push(initialCard);
  }

  public getCards() {
    return this.cards;
  }

  public add(card: Card) {
    if (!this.isValid(card)) {
      throw new Error("This card cannot be played");
    }

    this.cards.push(card);
    return card;
  }

  public abstract isValid(card: Card): boolean;

  protected lastCard() {
    return this.cards[this.cards.length - 1];
  }
}

export class AscendingRow extends Row {
  public isValid(card: Card) {
    return card.getValue() > this.lastCard().getValue();
  }
}

export class DescendingRow extends Row {
  public isValid(card: Card) {
    return card.getValue() < this.lastCard().getValue();
  }
}
