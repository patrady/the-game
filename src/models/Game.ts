import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { AscendingRow, DescendingRow, Row } from "./Row";
import { Turn } from "./Turn";

type ConfigurationProps = {
  minimum: number;
  maximum: number;
  handSize: number;
};

const DEFAULT_MIN_CARD_VALUE = 1;
const DEFAULT_MAX_CARD_VALUE = 100;
const DEFAULT_HAND_SIZE = 6;

enum GameStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Finished = "Finished",
}

export class Game {
  public ascendingRow1: AscendingRow;
  public ascendingRow2: AscendingRow;
  public descendingRow1: DescendingRow;
  public descendingRow2: DescendingRow;
  private minCard = new Card(DEFAULT_MIN_CARD_VALUE);
  private maxCard = new Card(DEFAULT_MAX_CARD_VALUE);
  private handSize = DEFAULT_HAND_SIZE;
  private players: Player[];
  private status: GameStatus;
  private deck: Deck;
  private currentPlayer: Player;
  private turns: Turn[];

  constructor(players: Player[]) {
    this.players = players;
    this.status = GameStatus.NotStarted;
    this.deck = new Deck(this.getMinCard(), this.getMaxCard());
    this.ascendingRow1 = new AscendingRow(this.getMinCard());
    this.ascendingRow2 = new AscendingRow(this.getMinCard());
    this.descendingRow1 = new DescendingRow(this.getMaxCard());
    this.descendingRow2 = new DescendingRow(this.getMaxCard());
    this.currentPlayer = players[0];
    this.turns = [];
  }

  public configure({
    maximum = DEFAULT_MAX_CARD_VALUE,
    minimum = DEFAULT_MIN_CARD_VALUE,
    handSize = DEFAULT_HAND_SIZE,
  }: Partial<ConfigurationProps>) {
    this.minCard = new Card(minimum);
    this.maxCard = new Card(maximum);
    this.handSize = handSize;
  }

  public getPlayers() {
    return this.players;
  }

  public getCurrentPlayer() {
    return this.currentPlayer;
  }

  public getDeck() {
    return this.deck;
  }

  public getMinCard() {
    return this.minCard;
  }

  public getMaxCard() {
    return this.maxCard;
  }

  public getStatus() {
    return this.status;
  }

  public getHandSize() {
    return this.handSize;
  }

  public getRows() {
    return [
      this.ascendingRow1,
      this.ascendingRow2,
      this.descendingRow1,
      this.descendingRow2,
    ];
  }

  public getTurns() {
    return this.turns;
  }

  public start() {
    if (this.isGameEmpty()) {
      throw new Error("The game cannot be started without any players");
    }
    if (this.isInProgress()) {
      throw new Error("The game is already in progress");
    }

    this.status = GameStatus.InProgress;
    this.deck = new Deck(this.getMinCard(), this.getMaxCard());
    this.ascendingRow1 = new AscendingRow(this.getMinCard());
    this.ascendingRow2 = new AscendingRow(this.getMinCard());
    this.descendingRow1 = new DescendingRow(this.getMaxCard());
    this.descendingRow2 = new DescendingRow(this.getMaxCard());
    this.dealInitialCards();

    this.currentPlayer = this.getPlayers()[0];
    this.turns.push(new Turn(this.currentPlayer));

    return this;
  }

  public playCard(card: Card, row: Row) {
    this.getCurrentPlayer().playCard(card, row);
    this.getCurrentTurn().track(card, row);
  }

  public nextTurn() {
    this.drawMoreCards();
    this.incrementCurrentPlayer();
    this.addNewTurn();
  }

  public isInProgress() {
    return this.status === GameStatus.InProgress;
  }

  public isOver() {
    if (this.isNotStarted()) {
      return false;
    }
    if (this.isEveryCardPlayed()) {
      console.log("every card has been played");
      return true;
    }
    if (this.getCurrentPlayer().isOutOfCards()) {
      return false;
    }

    const t = this.isNoPlayPossible();
    if (t) {
      console.log("no play possible");
    }

    return t;
  }

  public isNotStarted() {
    return this.status === GameStatus.NotStarted;
  }

  private drawMoreCards() {
    this.getCurrentPlayer().receiveCard(
      this.getDeck().draw(this.numberOfCardsToDraw())
    );
  }

  private numberOfCardsToDraw() {
    return (
      this.getHandSize() - this.getCurrentPlayer().getNumberOfCardsInHand()
    );
  }

  private incrementCurrentPlayer() {
    if (this.getCurrentPlayerIndex() === -1) {
      return;
    }

    this.currentPlayer = this.getPlayers()[this.nextPlayerIndex()];
  }

  private getCurrentPlayerIndex() {
    return this.getPlayers().findIndex((player) =>
      player.is(this.getCurrentPlayer())
    );
  }

  private nextPlayerIndex() {
    return (this.getCurrentPlayerIndex() + 1) % this.getNumberOfPlayers();
  }

  private addNewTurn() {
    this.turns.push(new Turn(this.getCurrentPlayer()));
  }

  private dealInitialCards() {
    for (let i = 0; i < this.getHandSize(); i++) {
      this.getPlayers().forEach((player) => {
        player.receiveCard(this.deck.draw());
      });
    }
  }

  private isEveryCardPlayed() {
    return (
      this.getDeck().isEmpty() &&
      this.getPlayers().every((player) => player.isOutOfCards())
    );
  }

  private isGameEmpty() {
    return this.getNumberOfPlayers() === 0;
  }

  private getNumberOfPlayers() {
    return this.getPlayers().length;
  }

  private isNoPlayPossible() {
    const cards = this.getCurrentPlayer().getHand();
    console.log("cards", cards);

    return !cards.some((card) =>
      this.getRows().some((row) => {
        console.log(row, card, row.canAccept(card));
        return row.canAccept(card);
      })
    );
  }

  private getCurrentTurn() {
    return this.turns[this.turns.length - 1];
  }
}
