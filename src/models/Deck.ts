import { Card } from "./Card";

export class Deck {
  cards: Card[] = [];

  constructor(minCard: Card, maxCard: Card) {
    this.range(minCard.getValue(), maxCard.getValue()).forEach((value) =>
      this.cards.push(new Card(value))
    );
  }

  public getCards() {
    return this.cards;
  }

  public draw() {
    if (this.isEmpty()) {
      throw new Error("There are no cards left in the deck");
    }

    return this.cards.splice(this.getRandomNumber(), 1)[0];
  }

  public isEmpty() {
    return this.getCards().length === 0;
  }

  private range(start: number, end: number) {
    const arr = [];
    for (let i = start + 1; i < end; i += 1) {
      arr.push(i);
    }

    return arr;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * this.getCards().length);
  }
}
