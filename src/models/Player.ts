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

  public receiveCard(card: Card) {
    this.hand.push(card);
  }

  public getHand() {
    return this.hand;
  }
}
