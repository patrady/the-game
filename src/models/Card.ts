export class Card {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  public isNot(card: Card) {
    return !this.is(card);
  }

  public is(card: Card) {
    return this.value === card.value;
  }
}
