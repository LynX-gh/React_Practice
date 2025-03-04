import { useState } from "react";

function Square({ val, winner, onSquareClick }) {
  return <button className={`square ${winner ? 'winner' : ""}`} onClick={onSquareClick}>{val}</button>;
}

function Board({xIsNext, squares, onPlay}) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  const [ board_status, setBoardStatus ] = useState("Next player: X");
  const [ win_idx, setWinIdx ] = useState(Array(3).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    var nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
    handleBoardStatus(nextSquares);
  }

  function handleBoardStatus(nextSquares) {
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setBoardStatus(`Winner: ${winner}`);
      return;
    }
    setBoardStatus(`Next player: ${xIsNext ? "O" : "X"}`);
  }

  function calculateWinner(nextSquares) {
    for (const [a, b, c] of lines) {
      if (nextSquares[a] && nextSquares[a] === nextSquares[b] && nextSquares[a] === nextSquares[c]) {
        setWinIdx([a, b, c]);
        return nextSquares[a];
      }
    }
    setWinIdx(Array(3).fill(null));
    return null;
  }

  return (
    <>
      <div className="status">{board_status}</div>
      {[0, 3, 6].map((rowStart) => (
        <div className="board-row" key={rowStart}>
          {[0, 1, 2].map((col) => {
            const index = rowStart + col;
            return (
              <Square key={index} val={squares[index]} winner={win_idx.includes(index)} onSquareClick={() => handleClick(index)} />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [ history, setHistory ] = useState([Array(9).fill(null)]);
  const [ moveHistory, setMoveHistory ] = useState([]);
  const [ currentMove, setCurrentMove ] = useState(0);
  const currentSquares = history[currentMove];
  const nextX = currentMove % 2 === 0;

  function handlePlay(nextSquares, i) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    const nextMoveHistory = [...moveHistory.slice(0, currentMove), (Math.floor(i / 3) + 1) + "," + (i % 3 + 1)];
    setMoveHistory(nextMoveHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let desc = move == currentMove ? "You are Here!" : move ? `Go to move #${move}` : "Go to game start";
    let [row, col] = moveHistory[move - 1]?.split(",") || [];
    return (
      <li key={move} style={{ marginBottom: "10px", listStyle: "none" }}>
        <button onClick={() => jumpTo(move)}> {desc} </button>
        {move ? ( <div>Row: {row}, Col: {col}</div> ) : null}
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={nextX} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}