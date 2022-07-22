import { Card } from "./Card";

type PlayerProps = {
  name: string;
};

export class Player {
  name: string;
  hand: Card[];

  constructor({ name }: PlayerProps) {
    this.name = name;
    this.hand = [];
  }

  public isNot(player: Player) {
    return !this.is(player);
  }

  public is(player: Player) {
    return this.name === player.name;
  }

  public receiveCard(card: Card | Card[]) {
    if (Array.isArray(card)) {
      this.hand.push(...card);
    } else {
      this.hand.push(card);
    }
  }

  public removeCard(card: Card) {
    const index = this.hand.findIndex((playerCard) => playerCard.is(card));
    if (index === -1) {
      throw new Error(`Card ${card.getValue()} is not in the player's hand`);
    }

    this.hand.splice(index, 1);
  }

  public getHand() {
    return this.hand;
  }
}
