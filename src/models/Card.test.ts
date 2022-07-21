import { Card } from "./Card";

const card1 = new Card(1);
const card2 = new Card(2);

describe("#is", () => {
  it("returns true if the values match", () => {
    expect(card1.is(card1)).toBeTruthy();
    expect(card2.is(card2)).toBeTruthy();
  });

  it("returns false if the values do not match", () => {
    expect(card1.is(card2)).toBeFalsy();
    expect(card2.is(card1)).toBeFalsy();
  });
});

describe("#isNot", () => {
  it("returns true if the values do not match", () => {
    expect(card1.isNot(card2)).toBeTruthy();
    expect(card2.isNot(card1)).toBeTruthy();
  });

  it("returns false if the values match", () => {
    expect(card1.isNot(card1)).toBeFalsy();
    expect(card2.isNot(card2)).toBeFalsy();
  });
});
