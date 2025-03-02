import { useState } from "react";

export default function Board() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  const [ board_status, setBoardStatus ] = useState("Next player: X");
  const [ nextX, setNextX ] = useState(true);
  const [ squares, setSquares ] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = nextX ? "X" : "O";
    setNextX(!nextX);
    setSquares(nextSquares);
    handleBoardStatus(nextSquares);
  }

  function handleBoardStatus(squares) {
    const winner = calculateWinner(squares);
    if (winner) {
      setBoardStatus(`Winner: ${winner}`);
      return;
    }
    setBoardStatus(`Next player: ${nextX ? "O" : "X"}`);
  }

  function calculateWinner(squares) {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{board_status}</div>
      <div className="board-row">
        <Square val={squares[0]} onSquareClick={() => {handleClick(0)}} />
        <Square val={squares[1]} onSquareClick={() => {handleClick(1)}} />
        <Square val={squares[2]} onSquareClick={() => {handleClick(2)}} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSquareClick={() => {handleClick(3)}} />
        <Square val={squares[4]} onSquareClick={() => {handleClick(4)}} />
        <Square val={squares[5]} onSquareClick={() => {handleClick(5)}} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSquareClick={() => {handleClick(6)}} />
        <Square val={squares[7]} onSquareClick={() => {handleClick(7)}} />
        <Square val={squares[8]} onSquareClick={() => {handleClick(8)}} />
      </div>
    </>
  );
}

function Square({ val, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{val}</button>;
}
