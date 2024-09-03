import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/AttentionAptitude.css';

const generateRandomLetters = (target) => {
  const lettersArray = [];
  const targetIndex = Math.floor(Math.random() * 100);
  for (let i = 0; i < 100; i++) {
    lettersArray.push(i === targetIndex ? target : String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  }
  return lettersArray.join('');
};

const AttentionAptitude = () => {
  const { updateScore } = useContext(GameContext);
  const navigate = useNavigate();

  const questions = [
    { question: "Encuentra la letra 'Q'", letters: generateRandomLetters('Q'), answer: "Q" },
    { question: "Encuentra la letra 'X'", letters: generateRandomLetters('X'), answer: "X" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [letters, setLetters] = useState(questions[0].letters);

  const handleNextQuestion = useCallback(() => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setLetters(questions[nextQuestion].letters);
      setTimeLeft(30); // Reiniciar el temporizador
    } else {
      updateScore('attention', score);
      navigate('/concentration');
    }
  }, [currentQuestion, navigate, questions, score, updateScore]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft, handleNextQuestion]);

  const handleLetterClick = (letter) => {
    if (letter === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  return (
    <div className="attention-aptitude-container">
      <h2 className="attention-aptitude-title">Prueba de Atención</h2>
      <div className="question-section">
        <p className="question-text">{questions[currentQuestion].question}</p>
        <div className="letters-grid">
          {letters.split('').map((letter, index) => (
            <span key={index} className="letter" onClick={() => handleLetterClick(letter)}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="progress-section">
        <p className="progress-text">Tiempo restante: {timeLeft} segundos</p>
        <p className="progress-text">Pregunta {currentQuestion + 1} de {questions.length}</p>
      </div>
    </div>
  );
};

export default AttentionAptitude;
