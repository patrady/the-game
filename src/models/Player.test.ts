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
