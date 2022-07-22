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

  public draw(maximum: number = 1) {
    const drawnCards: Card[] = [];
    while (!this.isEmpty() && drawnCards.length < maximum) {
      drawnCards.push(...this.cards.splice(this.getRandomNumber(), 1));
    }

    return drawnCards;
  }

  public isEmpty() {
    return this.getCards().length === 0;
  }

  public isOnlyOneCardLeft() {
    return this.getCards().length === 1;
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
