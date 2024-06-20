import { useState } from 'react';
import '../styles/board.css';
import useSearchForAWinner from '../hooks/useSearchForAWinner';
import Dialog from './Dialog';

const initialBoard = Array.from({ length: 9 }, () => '');

export default function Board() {
  const { turn, thereIsAWinner, searchForAWinner, handleThereIsAWinner } = useSearchForAWinner();
  const [board, setBoard] = useState(initialBoard);

  const handleMove = index => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    searchForAWinner(newBoard);
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          {board?.map((item, index) => (
            <div
              className="container-item"
              key={index}
              onClick={() => {
                if (!item) {
                  handleMove(index);
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setBoard(initialBoard);
          handleThereIsAWinner()
        }}
      >
        Empezar de nuevo
      </button>

      <Dialog isOpen={thereIsAWinner}>
        <p>{`Felicitaciones ${turn}, has ganado`}</p>
      </Dialog>
    </>
  );
}
