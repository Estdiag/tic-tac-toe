import { useState } from 'react';
import './App.css';

const players = {
  x: 'x',
  o: 'o',
};

const results = ['012', '036', '048', '147', '246', '258', '345', '678'];

function App() {
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => ''));
  const [contador, setContador] = useState(0);
  const [turn, setTurn] = useState(players.x);
  const [thereIsAWinner, setThereIsAWinner] = useState(false);

  const searchForAWinner = newBoardFiltered => {
    const currentmoved = newBoardFiltered
      .map((value, index) => (value === turn ? index : ''))
      .filter(index => index !== '');

    if (currentmoved?.length >= 3) {
      for (let i = 0; i < results.length; i++) {
        if (
          currentmoved.includes(Number(results[i][0])) &&
          currentmoved.includes(Number(results[i][1])) &&
          currentmoved.includes(Number(results[i][2]))
        ) {
          setThereIsAWinner(true);
          return;
        }
      }
    }
    setTurn(turn === players.x ? players.o : players.x);
  };

  const handleMove = index => {
    const newBoard = [...board];
    if (newBoard[index] === '') {
      newBoard[index] = turn;
      setContador(contador + 1);
      setBoard(newBoard);
    }

    if (contador >= 4) {
      searchForAWinner(newBoard);
      return;
    }
    setTurn(turn === players.x ? players.o : players.x);
  };

  return (
    <>
      <div className="container">
        {board.map((item, index) => (
          <div
            className="container-item"
            key={index}
            onClick={() => {
              handleMove(index);
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <dialog open={thereIsAWinner}>
        <p>Has ganado</p>
      </dialog>
    </>
  );
}

export default App;
