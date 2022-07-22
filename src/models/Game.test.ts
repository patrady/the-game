import { Game } from "./Game";
import { Player } from "./Player";

let player1 = new Player({ name: "Player 1" });
let players = [player1];

beforeEach(() => {
  player1 = new Player({ name: "Player 1" });
  players = [new Player({ name: "Player 1" })];
});

xdescribe("#round", () => {
  describe("at the beginning of the game", () => {
    it("returns 1", () => {
      const game = new Game(players);

      expect(game.round()).toEqual(1);
    });
  });

  describe("after all players have gone once", () => {
    it("returns 2", () => {
      const game = new Game({ maxPlayers: 2 });
      game.addPlayer(new Player({ name: "Player 1" }));
      game.addPlayer(new Player({ name: "Player 2" }));

      expect(game.round()).toEqual(1);

      game.nextTurn();
      game.nextTurn();

      expect(game.round()).toEqual(2);
    });
  });
});

xdescribe("#getCode", () => {
  it("returns a 5-character string", () => {
    const game = new Game(players);

    expect(game.getCode().length).toEqual(5);
  });

  describe("with a custom preset", () => {
    it("returns the code", () => {
      const game = new Game({ code: "abcde" });

      expect(game.getCode()).toEqual("abcde");
    });
  });
});

xdescribe("#share", () => {
  it("returns a URL to the specific game", () => {
    const game = new Game({ code: "abcde" });

    expect(game.share()).toEqual("https://www.thegame.io/abcde");
  });
});

xdescribe("#isOver", () => {
  it("returns true by default", () => {
    const game = new Game(players);

    expect(game.isOver()).toBeTruthy();
  });

  describe("when there are no players", () => {
    it("returns true", () => {
      const game = new Game([]);
      const player1 = new Player({ name: "Player 1" });

      game.addPlayer(player1);
      game.play();

      expect(game.isOver()).toBeFalsy();

      game.removePlayer(player1);
      expect(game.isOver()).toBeTruthy();
    });
  });

  describe("when all the cards are gone", () => {
    it("returns true", () => {});
  });
});

xdescribe("#turn", () => {
  it("returns the player whose turn it is", () => {
    const game = new Game();
    const player1 = new Player({ name: "Player 1" });
    const player2 = new Player({ name: "Player 2" });
    const player3 = new Player({ name: "Player 3" });

    game.addPlayer(player1);
    game.addPlayer(player2);
    game.addPlayer(player3);

    game.play();
    expect(game.turn()).toEqual(player1);

    game.nextTurn();
    expect(game.turn()).toEqual(player2);

    game.nextTurn();
    expect(game.turn()).toEqual(player3);

    game.nextTurn();
    expect(game.turn()).toEqual(player1);
  });

  describe("when all players have left the game", () => {
    it("throws an error", () => {
      const game = new Game();
      const player1 = new Player({ name: "Player 1" });

      game.addPlayer(player1);
      game.play();
      game.removePlayer(player1);

      expect(game.turn()).toThrow("There are no players");
    });
  });

  describe("when the game is over", () => {
    it("throws an error", () => {
      const game = new Game();

      game.play();
      game.stop();

      expect(game.turn()).toThrow("The game is over");
    });
  });
});

describe("#start", () => {
  it("changes the status", () => {
    const game = new Game(players);

    expect(game.status).toEqual("NotStarted");

    game.start();

    expect(game.status).toEqual("InProgress");
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
      expect(player.getHand().length).toEqual(6);
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
