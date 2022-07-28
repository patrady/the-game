import { Card } from "./Card";
import { Game } from "./Game";
import { Player } from "./Player";

let player1 = new Player({ name: "Player 1" });
let players = [player1];

beforeEach(() => {
  player1 = new Player({ name: "Player 1" });
  players = [new Player({ name: "Player 1" })];

  jest.resetAllMocks();
});

describe("#isOver", () => {
  describe("when the game has not been started", () => {
    it("returns false", () => {
      const game = new Game(players);

      expect(game.isOver()).toBeFalsy();
    });
  });

  describe("when the game has been started", () => {
    it("returns false", () => {
      const game = new Game(players);

      game.start();

      expect(game.isOver()).toBeFalsy();
    });
  });

  describe("when all the cards are gone from the deck", () => {
    describe("when all players are out of cards", () => {
      it("returns true", () => {
        const game = new Game(players);
        game.configure({ maximum: 5, handSize: 1 }); // Deck: [2, 3, 4]

        game.start();

        game.getCurrentPlayer().playRandomCard(); // Play 2
        game.nextTurn();

        game.getCurrentPlayer().playRandomCard(); // Play 3
        game.nextTurn();

        game.getCurrentPlayer().playRandomCard(); // Play 4
        game.nextTurn();

        expect(game.isOver()).toBeTruthy();
      });
    });

    describe("when at least one player still has cards", () => {
      it("returns false", () => {
        const game = new Game(players);
        game.configure({ maximum: 5, handSize: 1 }); // Deck: [2, 3, 4], Player 1: []

        game.start(); // Deck: [3, 4], Player 1: [2]

        game.getCurrentPlayer().playRandomCard(); // Play 2
        game.nextTurn(); // Deck: [4], Player 1: [3]

        game.getCurrentPlayer().playRandomCard(); // Play 3
        game.nextTurn(); // Deck: [], Player 1: [4]

        expect(game.isOver()).toBe(false);
      });
    });
  });
});

describe("#start", () => {
  it("changes the status", () => {
    const game = new Game(players);

    expect(game.getStatus()).toEqual("NotStarted");

    game.start();

    expect(game.getStatus()).toEqual("InProgress");
  });

  it("initializes the rows", () => {
    const game = new Game(players);

    game.start();

    const minCard1 = game.ascendingRow1.getCards()[0];
    const minCard2 = game.ascendingRow2.getCards()[0];
    const maxCard1 = game.descendingRow1.getCards()[0];
    const maxCard2 = game.descendingRow2.getCards()[0];

    expect(minCard1.getValue()).toEqual(1);
    expect(minCard2.getValue()).toEqual(1);
    expect(maxCard1.getValue()).toEqual(100);
    expect(maxCard2.getValue()).toEqual(100);
  });

  it("initializes the current player's turn", () => {
    const game = new Game(players);

    game.start();

    expect(game.getCurrentPlayer().is(player1)).toBeTruthy();
  });

  it("deals out the initial cards to each player", () => {
    const game = new Game(players);

    game.start();

    game.getPlayers().forEach((player) => {
      expect(player.getNumberOfCardsInHand()).toEqual(6);
    });
  });

  describe("with no players", () => {
    it("throws an error", () => {
      const game = new Game([]);

      expect(() => game.start()).toThrow(
        "The game cannot be started without any players"
      );
    });
  });

  describe("when it has already been started", () => {
    it("throws an error", () => {
      const game = new Game(players);

      game.start();

      expect(() => game.start()).toThrow("The game is already in progress");
    });
  });
});

describe("#isInProgress", () => {
  describe("when the game is in progress", () => {
    it("returns true", () => {
      const game = new Game(players);

      game.start();

      expect(game.isInProgress()).toBeTruthy();
    });
  });

  describe("when the game has not started", () => {
    it("returns false", () => {
      const game = new Game(players);

      expect(game.isInProgress()).toBeFalsy();
    });
  });

  xdescribe("when the game is over", () => {
    it("returns false", () => {});
  });
});

describe("#nextTurn", () => {
  it("gives the turn to the next player", () => {
    const player1 = new Player({ name: "Player 1" });
    const player2 = new Player({ name: "Player 2" });
    const player3 = new Player({ name: "Player 3" });
    const players = [player1, player2, player3];
    const game = new Game(players);

    game.start();

    expect(game.getCurrentPlayer()).toEqual(player1);

    player1.playRandomCard(); // 5 cards in hand
    player1.playRandomCard(); // 4 cards in hand
    game.nextTurn();

    expect(player1.getNumberOfCardsInHand()).toEqual(6);
    expect(game.getCurrentPlayer()).toEqual(player2);

    player2.playRandomCard(); // 5 cards in hand
    player2.playRandomCard(); // 4 cards in hand
    player2.playRandomCard(); // 3 cards in hand
    player2.playRandomCard(); // 2 cards in hand
    game.nextTurn();

    expect(player2.getNumberOfCardsInHand()).toEqual(6);
    expect(game.getCurrentPlayer()).toEqual(player3);

    player3.playRandomCard(); // 5 cards in hand
    game.nextTurn();

    expect(player3.getNumberOfCardsInHand()).toEqual(6);
    expect(game.getCurrentPlayer()).toEqual(player1);
  });
});

describe("#getTurns", () => {
  it("returns the turns taken in the game", () => {
    const player1 = new Player({ name: "Player 1" });
    const player2 = new Player({ name: "Player 2" });
    const players = [player1, player2];
    const game = new Game(players);

    game.start();
    player1.playRandomCard(); // TODO: I want this to `game.playCard` but that leads to some testing woahs
    player1.playRandomCard();
    game.nextTurn();

    const turn1 = game.getTurns()[0];
    expect(turn1.getPlayer()).toEqual(player1);
    expect(turn1.getNumberOfMoves()).toEqual(2);

    player2.playRandomCard(); // 5 cards in hand
    player2.playRandomCard(); // 4 cards in hand
    player2.playRandomCard(); // 3 cards in hand
    player2.playRandomCard(); // 2 cards in hand
    game.nextTurn();

    const turn2 = game.getTurns()[0];
    expect(turn2.getPlayer()).toEqual(player2);
    expect(turn2.getNumberOfMoves()).toEqual(4);
  });
});
