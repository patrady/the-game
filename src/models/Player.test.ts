import { Card } from "./Card";
import { Player } from "./Player";

const jack = new Player({ name: "Jack" });
const jill = new Player({ name: "Jill" });

describe("#is", () => {
  it("returns true if the names match", () => {
    expect(jack.is(jack)).toBeTruthy();
    expect(jill.is(jill)).toBeTruthy();
  });

  it("returns false if the names do not match", () => {
    expect(jack.is(jill)).toBeFalsy();
    expect(jill.is(jack)).toBeFalsy();
  });
});

describe("#isNot", () => {
  it("returns true if the names do not match", () => {
    expect(jack.isNot(jill)).toBeTruthy();
    expect(jill.isNot(jack)).toBeTruthy();
  });

  it("returns false if the names match", () => {
    expect(jack.isNot(jack)).toBeFalsy();
    expect(jill.isNot(jill)).toBeFalsy();
  });
});

describe("#receiveCard", () => {
  it("adds a card to the hand", () => {
    const player = new Player({ name: "Player 1" });

    expect(player.getHand().length).toEqual(0);

    player.receiveCard(new Card(10));

    expect(player.getHand().length).toEqual(1);
  });
});

describe("#removeCard", () => {
  describe("when the player has the card", () => {
    it("removes the card from the player's hand", () => {
      const player = new Player({ name: "Player 1" });
      player.receiveCard(new Card(10));
      player.receiveCard(new Card(15));
      player.receiveCard(new Card(20));

      player.removeCard(new Card(10));

      expect(player.getHand().length).toEqual(2);
    });
  });

  describe("when the player does not have the card", () => {
    it("throws an error", () => {
      const player = new Player({ name: "Player 1" });

      expect(() => player.removeCard(new Card(10))).toThrow(
        "Card 10 is not in the player's hand"
      );
    });
  });
});
