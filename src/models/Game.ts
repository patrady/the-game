import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { AscendingRow, DescendingRow } from "./Row";

const DEFAULT_MIN_CARD_VALUE = 1;
const DEFAULT_MAX_CARD_VALUE = 100;
const DEFAULT_INITIAL_CARDS = 6;

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
  private players: Player[];
  private status: GameStatus;
  private deck: Deck;
  private currentPlayer: Player;

  constructor(players: Player[]) {
    this.players = players;
    this.status = GameStatus.NotStarted;
    this.deck = new Deck(this.minCard, this.maxCard);
    this.ascendingRow1 = new AscendingRow(this.minCard);
    this.ascendingRow2 = new AscendingRow(this.minCard);
    this.descendingRow1 = new DescendingRow(this.maxCard);
    this.descendingRow2 = new DescendingRow(this.maxCard);
    this.currentPlayer = players[0];
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

    return this;
  }

  public nextTurn() {
    this.drawMoreCards();
    this.incrementCurrentPlayer();
  }

  public isInProgress() {
    return this.status === GameStatus.InProgress;
  }

  private drawMoreCards() {
    this.getCurrentPlayer().receiveCard(this.getDeck().drawAfterTurn());
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

  private dealInitialCards() {
    for (let i = 0; i < DEFAULT_INITIAL_CARDS; i++) {
      this.getPlayers().forEach((player) => {
        player.receiveCard(this.deck.drawSingle());
      });
    }
  }

  private isGameEmpty() {
    return this.getNumberOfPlayers() === 0;
  }

  private getNumberOfPlayers() {
    return this.getPlayers().length;
  }
}
