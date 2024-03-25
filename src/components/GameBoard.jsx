import { useState } from "react";


export default function GameBoard({ onSelectSquare, gameBoard }) {
    // const [gameBoard, setGameBoard] = useState(initGameBoard);
    // function cellClickHandler(i, j)
    // {
    //     setGameBoard(preGameBoard => {
    //         // ! 必须先deep copy，不能直接update preBoard，不然concurrency问题
    //         const updatedBoard = [...preGameBoard.map(x=>[...x])];
    //         updatedBoard[i][j] = activeSymbol;

    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }


    return (
        <ol id="game-board">
            {gameBoard.map(
                (r, i) =>
                    <li key={i}>
                        <ol>
                            {r.map((c, j) =>
                                <li key={j}>
                                    <button onClick={() => onSelectSquare(i, j)} disabled={c !== null}>{c}</button>
                                </li>)}
                        </ol>
                    </li>
            )}
        </ol>
    );
}