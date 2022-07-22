import { Card } from "./Card";
import { Deck } from "./Deck";

it("returns the cards left to be dealt", () => {
  const deck = new Deck(new Card(1), new Card(100));
  expect(deck.getCards().length).toEqual(98); // Excludes 1 and 100

  deck.draw();

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

describe("#draw", () => {
  const maximum = 3;

  it("draws until it hits the maximum", () => {
    const deck = new Deck(new Card(1), new Card(5));

    const cards = deck.draw(maximum);

    expect(cards.length).toEqual(3);
    cards.forEach((card) => {
      expect(card.getValue()).toBeGreaterThan(1);
      expect(card.getValue()).toBeLessThan(5);
    });
  });

  describe("when no cards are available", () => {
    it("returns an empty array", () => {
      const deck = new Deck(new Card(1), new Card(1));

      expect(deck.draw(maximum)).toEqual([]);
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
