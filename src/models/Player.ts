import { Card } from "./Card";
import { Row } from "./Row";

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

  public playCard(card: Card, row: Row) {
    const index = this.hand.findIndex((playerCard) => playerCard.is(card));
    if (index === -1) {
      throw new Error(`Card ${card.getValue()} is not in the player's hand`);
    }

    row.add(card);
    return this.hand.splice(index, 1)[0];
  }

  public playRandomCard() {
    return this.hand.splice(0, 1)[0];
  }

  public getHand() {
    return this.hand;
  }

  public getNumberOfCardsInHand() {
    return this.getHand().length;
  }
}
