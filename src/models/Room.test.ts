import { Player } from "./Player";
import { Room } from "./Room";

describe("Room", () => {
  describe("#addPlayer", () => {
    it("adds a player", () => {
      const room = new Room();
      room.addPlayer(new Player({ name: "Player 1" }));

      expect(room.getPlayers().length).toEqual(1);
    });

    it("adds multiple players", () => {
      const room = new Room();
      room.addPlayer(new Player({ name: "Player 1" }));
      room.addPlayer(new Player({ name: "Player 2" }));
      room.addPlayer(new Player({ name: "Player 3" }));

      expect(room.getPlayers().length).toEqual(3);
    });

    describe("when there are more than the maximum number of players", () => {
      it("throws an error", () => {
        const room = new Room().configure({ maxPlayers: 2 });
        room.addPlayer(new Player({ name: "Player 1" }));
        room.addPlayer(new Player({ name: "Player 2" }));

        expect(() => room.addPlayer(new Player({ name: "Player 3" }))).toThrow(
          "Only 2 players can play the game"
        );
        expect(room.getPlayers().length).toEqual(2);
      });
    });
  });

  describe("#removePlayer", () => {
    it("removes the player", () => {
      const room = new Room();
      const player1 = new Player({ name: "Player 1" });

      room.addPlayer(player1);
      room.removePlayer(player1);

      expect(room.getPlayers()).toEqual([]);
    });

    describe("when the player cannot be found", () => {
      it("throws an error", () => {
        const room = new Room();
        const player1 = new Player({ name: "Player 1" });

        expect(() => room.removePlayer(player1)).toThrow(
          "Player 1 could not be removed from the game"
        );
      });
    });
  });

  describe("#getMaxPlayers", () => {
    it("returns 4 by default", () => {
      const room = new Room();

      expect(room.getMaxPlayers()).toEqual(4);
    });

    describe("when an custom rule is set", () => {
      describe("when the custom rule is valid", () => {
        it("returns the custom rule", () => {
          [1, 2, 3, 4, 5, 6].forEach((maxPlayers) => {
            const room = new Room().configure({ maxPlayers });
            expect(room.getMaxPlayers()).toEqual(maxPlayers);
          });
        });
      });

      describe("when the custom rule is invalid", () => {
        it("returns default", () => {
          [-1, 0, 7, 8].forEach((maxPlayers) => {
            const room = new Room().configure({ maxPlayers });
            expect(room.getMaxPlayers()).toEqual(4);
          });
        });
      });
    });
  });
});
