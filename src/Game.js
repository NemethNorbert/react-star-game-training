import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React, { useState } from 'react';
import Answer from './modules/Answer';
import Button from './modules/Button';
import Stars from './modules/Stars';
import DoneFrame from './modules/DoneFrame';
import Numbers from './modules/Numbers';

const randomNumber = () => 1 + Math.floor(Math.random() * 9);

const Game = () => {

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumberOfStars, setRandomNumberOfStars] = useState(randomNumber());
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);
  const [redraws, setRedraws] = useState(5);
  const [doneStatus, setDoneStatus] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);

  React.useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft -1);
      },1000);

      return () => clearTimeout(timer);
    }
  })

  const selectNumber = (clickedNumber) => {
    if (selectedNumbers.indexOf(clickedNumber) >= 0 || usedNumbers.indexOf(clickedNumber) >= 0) {
      return;
    }
    setAnswerIsCorrect(null);
    setSelectedNumbers(selectedNumbers.concat(clickedNumber));
  };

  const unselectNumber = (clickedNumber) => {
    setAnswerIsCorrect(null);
    setSelectedNumbers(selectedNumbers.filter(number => number !== clickedNumber));
  };

  const checkAnswer = () => {
    setAnswerIsCorrect(randomNumberOfStars ===
      selectedNumbers.reduce((acc, n) => acc + n, 0));
  };

  const acceptAnswer = () => {
    setUsedNumbers(usedNumbers.concat(selectedNumbers));
    setSelectedNumbers([]);
    setAnswerIsCorrect(null);
    setRandomNumberOfStars(randomNumber());
  };

  const redraw = () => {
    if (redraws === 0) {
      return;
    }

    setRandomNumberOfStars(randomNumber());
    setAnswerIsCorrect(null);
    setSelectedNumbers([]);
    setRedraws(redraws - 1);
  }
  return (
    <div className="container">
      <h3>Play Nine</h3>
      <hr />
      <div className="row">
        <Stars numberOfStars={randomNumberOfStars} />
        <Button selectedNumbers={selectedNumbers}
          redraws={redraws}
          checkAnswer={checkAnswer}
          acceptAnswer={acceptAnswer}
          redraw={redraw}
          answerIsCorrect={answerIsCorrect} />
        <Answer selectedNumbers={selectedNumbers}
          unselectNumber={unselectNumber} />
      </div>
      <br />
      {doneStatus ?
        <DoneFrame doneStatus={doneStatus} /> :
        <Numbers selectedNumbers={selectedNumbers}
          selectNumber={selectNumber}
          usedNumbers={usedNumbers} />
      }
      <p>Time Reamining: {secondsLeft}</p>
    </div>
  );
};

export default Game;
