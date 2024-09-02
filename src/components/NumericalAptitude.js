import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/NumericalAptitude.css';

const NumericalAptitude = () => {
  const { updateScore } = useContext(GameContext);
  const navigate = useNavigate();

  const gameSequence = [
    "/verbal",
    "/spatial",
    "/attention",
    "/concentration",
    "/reasoning",
    "/numerical",
    "/mechanical",
    "/orthography"
  ];

  const currentGameIndex = gameSequence.indexOf("/numerical");
  const nextGame = gameSequence[currentGameIndex + 1];

  const questions = [
    { 
      question: "Si 3x + 7 = 19, ¿cuál es el valor de x?", 
      options: ["3", "4", "5", "6"], 
      answer: "4" 
    },
    { 
      question: "¿Cuál es la suma de los primeros 10 números naturales?", 
      options: ["45", "55", "65", "75"], 
      answer: "55" 
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        updateScore('numerical', score + (isCorrect ? 1 : 0)); // Asegura que la última respuesta se cuente correctamente
        alert(`¡Has completado la prueba! Tu puntaje es ${score + (isCorrect ? 1 : 0)}/${questions.length}`);
        navigate(nextGame);
      }
    }, 1000); // Transición de 1 segundo
  };

  return (
    <div className="numerical-aptitude-container">
      <h2 className="numerical-aptitude-title">Prueba de Aptitud Numérica</h2>
      <div className="question-section">
        <p className="question-text">{questions[currentQuestion].question}</p>
        <ul className="options-list">
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${showFeedback}`}
              onClick={() => handleAnswerOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        {showFeedback && <div className={`feedback ${showFeedback}`}>{showFeedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}</div>}
      </div>
    </div>
  );
};

export default NumericalAptitude;
