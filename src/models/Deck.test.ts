import { Card } from "./Card";
import { Deck } from "./Deck";

it("returns the cards left to be dealt", () => {
  const deck = new Deck(new Card(1), new Card(100));
  expect(deck.getCards().length).toEqual(98); // Excludes 1 and 100

  deck.drawSingle();

  expect(deck.getCards().length).toEqual(97);
});

describe("#getCards", () => {
  it("generates a correct deck", () => {
    const deck = new Deck(new Card(1), new Card(10));
    expect(deck.getCards()).toEqual([
      new Card(2),
      new Card(3),
      new Card(4),
      new Card(5),
      new Card(6),
      new Card(7),
      new Card(8),
      new Card(9),
    ]);
  });
});

describe("#drawAfterTurn", () => {
  describe("when two cards are available", () => {
    it("draws two cards", () => {
      const deck = new Deck(new Card(1), new Card(5));

      const cards = deck.drawAfterTurn();

      expect(cards.length).toEqual(2);
    });
  });

  describe("when one card is available", () => {
    it("draws one card", () => {
      const deck = new Deck(new Card(1), new Card(3));

      const cards = deck.drawAfterTurn();

      expect(cards.length).toEqual(1);
    });
  });

  describe("when no cards are available", () => {
    it("throws an error", () => {
      const deck = new Deck(new Card(1), new Card(1));

      expect(() => deck.drawAfterTurn()).toThrow();
    });
  });
});

describe("#drawSingle", () => {
  it("draws a random card", () => {
    const deck = new Deck(new Card(1), new Card(100));

    const card1 = deck.drawSingle();

    expect(card1.getValue()).toBeGreaterThan(1);
    expect(card1.getValue()).toBeLessThan(100);

    const card2 = deck.drawSingle();

    expect(card2.isNot(card1)).toBeTruthy();
    expect(card1.getValue()).toBeGreaterThan(1);
    expect(card1.getValue()).toBeLessThan(100);
  });

  describe("when no cards are left", () => {
    it("throws an error", () => {
      const deck = new Deck(new Card(1), new Card(5));

      deck.drawSingle(); // Draw the 2
      deck.drawSingle(); // Draw the 3
      deck.drawSingle(); // Draw the 4

      expect(() => deck.drawSingle()).toThrow(
        "There are no cards left in the deck"
      );
    });
  });
});

describe("#isEmpty", () => {
  describe("when the deck has cards", () => {
    it("returns false", () => {
      const deck = new Deck(new Card(1), new Card(100));

      expect(deck.isEmpty()).toBeFalsy();
    });
  });

  describe("when the deck is out of cards", () => {
    it("returns true", () => {
      const deck = new Deck(new Card(1), new Card(2));

      expect(deck.isEmpty()).toBeTruthy();
    });
  });
});
