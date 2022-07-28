import { Card } from "./Card";
import { Player } from "./Player";
import { Row } from "./Row";

type Move = {
  row: Row;
  card: Card;
};

export class Turn {
  player: Player;
  moves: Move[];

  constructor(player: Player) {
    this.player = player;
    this.moves = [];
  }

  public getPlayer() {
    return this.player;
  }

  public getMoves() {
    return this.moves;
  }

  public getNumberOfMoves() {
    return this.moves.length;
  }

  public track(card: Card, row: Row) {
    this.moves.push({ row, card });
  }
}
