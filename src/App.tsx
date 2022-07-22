import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import "./App.css";
import { Game } from "./models/Game";
import { Player } from "./models/Player";
import { Room } from "./models/Room";
import { Card as CardModel } from "./models/Card";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCard from "./components/Card/DraggableCard";
import { DroppableRow } from "./components/Row/DroppableRow";
import { Row as RowModel } from "./models";

const room = new Room();
room.addPlayer(new Player({ name: "Patrick" }));

const App = () => {
  const [game, setGame] = useState(new Game(room.getPlayers()));
  const [counter, setCounter] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars

  function startGame() {
    setGame(game.start());
    setCounter((prev) => prev + 1);
  }

  function dropCard(card: CardModel, row: RowModel) {
    game.getCurrentPlayer().removeCard(card);
    row.add(card);
    setCounter((prev) => prev + 1);
  }

  function drawMoreCards() {
    game.getCurrentPlayer().receiveCard(game.getDeck().drawAfterTurn());
    setCounter((prev) => prev + 1);
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <DroppableRow
          index={1}
          direction="descending"
          row={game.descendingRow1}
          onDrop={(card) => dropCard(card, game.descendingRow1)}
        />
        <DroppableRow
          index={2}
          direction="descending"
          row={game.descendingRow2}
          onDrop={(card) => dropCard(card, game.descendingRow2)}
        />
        <DroppableRow
          index={1}
          direction="ascending"
          row={game.ascendingRow1}
          onDrop={(card) => dropCard(card, game.ascendingRow1)}
        />
        <DroppableRow
          index={2}
          direction="ascending"
          row={game.ascendingRow2}
          onDrop={(card) => dropCard(card, game.ascendingRow2)}
        />
        {game.getPlayers().map((player) => (
          <div key={player.name}>
            {player.getHand().map((card) => (
              <DraggableCard key={card.getValue()} value={card.getValue()} />
            ))}
          </div>
        ))}

        {!game.isInProgress() && <button onClick={startGame}>Start</button>}
        {game.isInProgress() && <button onClick={drawMoreCards}>Draw</button>}
      </DndProvider>
    </div>
  );
};

export default App;
