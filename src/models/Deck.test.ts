import { Card } from "./Card";
import { Deck } from "./Deck";

it("returns the cards left to be dealt", () => {
  const deck = new Deck(new Card(1), new Card(100));
  expect(deck.getCards().length).toEqual(98); // Excludes 1 and 100

  deck.draw();

  expect(deck.getCards().length).toEqual(97);
});

describe("#draw", () => {
  it("draws a random card", () => {
    const deck = new Deck(new Card(1), new Card(100));

    const card1 = deck.draw();

    expect(card1.getValue()).toBeGreaterThan(1);
    expect(card1.getValue()).toBeLessThan(100);

    const card2 = deck.draw();

    expect(card2.isNot(card1)).toBeTruthy();
    expect(card1.getValue()).toBeGreaterThan(1);
    expect(card1.getValue()).toBeLessThan(100);
  });

  describe("when no cards are left", () => {
    it("throws an error", () => {
      const deck = new Deck(new Card(1), new Card(5));

      deck.draw(); // Draw the 2
      deck.draw(); // Draw the 3
      deck.draw(); // Draw the 4

      expect(() => deck.draw()).toThrow("There are no cards left in the deck");
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
