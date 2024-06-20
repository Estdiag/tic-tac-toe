import { useState } from 'react';
import { players } from '../types/players';
import { results } from '../types/results';

export default function useSearchForAWinner() {
  const [turn, setTurn] = useState(players.x);
  const [thereIsAWinner, setThereIsAWinner] = useState(false);

  const handleThereIsAWinner =()=>{
    setThereIsAWinner(false)
  }

  function searchForAWinner(newBoard) {
    const currentmoved = [...newBoard]
      .map((value, index) => (value === turn ? index : ''))
      .filter(index => index !== '');

    if (currentmoved.length >= 3) {
      for (let i = 0; i < results.length; i++) {
        if (
          currentmoved.includes(Number(results[i][0])) &&
          currentmoved.includes(Number(results[i][1])) &&
          currentmoved.includes(Number(results[i][2]))
        ) {
          setThereIsAWinner(true);
          return
        }
      }
    }
    setTurn(turn === players.x ? players.o : players.x);
  }

  return { turn, thereIsAWinner, searchForAWinner, handleThereIsAWinner };
}
