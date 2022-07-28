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
room.addPlayer(new Player({ name: "James" }));

const game = new Game(room.getPlayers());
game.configure({ maximum: 20, handSize: 3 });

const App = () => {
  const [cardsPlayedInTurn, setCardsPlayedInTurn] = useState<CardModel[]>([]);
  const [counter, setCounter] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars
  const canEndTurn = cardsPlayedInTurn.length >= 2;

  function startGame() {
    game.start();
    setCounter((prev) => prev + 1);
  }

  function dropCard(card: CardModel, row: RowModel) {
    game.playCard(card, row);
    setCardsPlayedInTurn((prev) => [...prev, card]);
  }

  function endTurn() {
    game.nextTurn();
    setCardsPlayedInTurn([]);
  }

  if (game.isOver()) {
    console.log('game', game);
    return <div>Game Over</div>;
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

        <hr />
        <p>{game.getCurrentPlayer().name} turn</p>

        {game
          .getCurrentPlayer()
          .getHand()
          .map((card) => (
            <DraggableCard key={card.getValue()} value={card.getValue()} />
          ))}

        {!game.isInProgress() && <button onClick={startGame}>Start</button>}
        {game.isInProgress() && canEndTurn && (
          <button onClick={endTurn}>End Turn</button>
        )}
      </DndProvider>
    </div>
  );
};

export default App;
