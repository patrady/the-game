import { Card } from "./Card";

export abstract class Row {
  private cards: Card[] = [];

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
    return this.isCardGreater(card) || this.isCardTenLess(card);
  }

  private isCardGreater(card: Card) {
    return card.getValue() > this.lastCard().getValue();
  }

  private isCardTenLess(card: Card) {
    return this.lastCard().getValue() - card.getValue() === 10;
  }
}

export class DescendingRow extends Row {
  public isValid(card: Card) {
    return this.isCardLess(card) || this.isCardTenGreater(card);
  }

  private isCardLess(card: Card) {
    return card.getValue() < this.lastCard().getValue();
  }

  private isCardTenGreater(card: Card) {
    return card.getValue() - this.lastCard().getValue() === 10;
  }
}
