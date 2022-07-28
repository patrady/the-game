import { Card } from "./Card";
import { Player } from "./Player";
import { AscendingRow, DescendingRow } from "./Row";
import { Turn } from "./Turn";

const player1 = new Player({ name: "Player 1" });

it("keeps track of the player", () => {
  const turn = new Turn(player1);

  expect(turn.getPlayer()).toEqual(player1);
});

describe("#track", () => {
  it("keeps track of each card played", () => {
    const turn = new Turn(player1);
    const ascendingRow = new AscendingRow(new Card(1));
    const descendingRow = new DescendingRow(new Card(20));

    turn.track(new Card(5), ascendingRow);
    turn.track(new Card(18), descendingRow);

    expect(turn.getNumberOfMoves()).toEqual(2);
    expect(turn.getMoves()).toEqual([
      {
        row: ascendingRow,
        card: new Card(5),
      },
      {
        row: descendingRow,
        card: new Card(18),
      },
    ]);
  });
});
