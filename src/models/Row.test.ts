import { Card } from "./Card";
import { AscendingRow, DescendingRow } from "./Row";

describe("AscendingRow", () => {
  describe("#add", () => {
    describe("when the next card is valid", () => {
      it("adds the card", () => {
        const row = new AscendingRow(new Card(1));

        row.add(new Card(2));

        expect(row.getCards().length).toEqual(2);
      });
    });

    describe("when the next card is not valid", () => {
      it("throws an error", () => {
        const row = new AscendingRow(new Card(1));

        row.add(new Card(5));
        row.add(new Card(7));

        expect(() => row.add(new Card(4))).toThrow(
          "This card cannot be played"
        );
      });
    });
  });
});

describe("DescendingRow", () => {
  describe("#add", () => {
    describe("when the next card is valid", () => {
      it("adds the card", () => {
        const row = new DescendingRow(new Card(100));

        row.add(new Card(99));

        expect(row.getCards().length).toEqual(2);
      });
    });

    describe("when the next card is not valid", () => {
      it("throws an error", () => {
        const row = new DescendingRow(new Card(100));

        row.add(new Card(97));
        row.add(new Card(92));

        expect(() => row.add(new Card(95))).toThrow(
          "This card cannot be played"
        );
      });
    });
  });
});
