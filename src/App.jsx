import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations"
import GameOver from "./components/GameOver";

const initGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActiveP(turns) {
  let activeP = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    activeP = "O";
  }

  return activeP;
}

function getWinner(gameBoard) {
  for (const comb of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comb[0].row][comb[0].column]
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].column]
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].column]

    if (firstSquareSymbol === null || secondSquareSymbol === null || thirdSquareSymbol === null) {
      continue;
    }

    if (firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      return firstSquareSymbol;
    }
  }

  let nullCount = 0;
  for (let r of gameBoard) {
    for (let c of r) {
      if (c === null) {
        ++nullCount;
      }
    }
  }

  return nullCount === 0 ? "D" : null;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    "X": "Player1",
    "O": "Player2"
  });

  const activeP = getActiveP(gameTurns);

  function selectCellHandler(i, j) {
    setGameTurns(
      prevTurns => {
        let currentP = getActiveP(prevTurns);

        const updatedTurns = [{ square: { row: i, col: j }, player: currentP }, ...prevTurns];

        return updatedTurns;
      }
    );
  }

  function reset() {
    setGameTurns([]);
  }

  let gameBoard = [...initGameBoard.map(x => [...x])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = getWinner(gameBoard);

  function onPlayerNameChange(sym, newName) {
    setPlayers(x => {
      let tmp = { ...x, [sym]: newName };
      console.log(tmp);
      return tmp;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initName="Player1" symbol="X" isActive={activeP === "X"} onPlayerNameChange={onPlayerNameChange} />
          <Player initName="Player2" symbol="O" isActive={activeP === "O"} onPlayerNameChange={onPlayerNameChange} />
        </ol>
        {(winner === "X" || winner === "O") ? `You won, ${players[winner]}` : ""}
        {winner && <GameOver winner={winner} reset={reset}></GameOver>}
        <GameBoard onSelectSquare={selectCellHandler} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
