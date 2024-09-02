import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/ReasoningAptitude.css';

const ReasoningAptitude = () => {
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

  const currentGameIndex = gameSequence.indexOf("/reasoning");
  const nextGame = gameSequence[currentGameIndex + 1];

  const questions = [
    { 
      question: "¿Qué figura sigue en la serie: ⬛️⬛️⬛️⬜️⬛️?", 
      options: ["⬛️", "⬜️", "⬛️◻️", "⬛️⬛️⬛️"], 
      answer: "⬛️" 
    },
    { 
      question: "¿Qué figura sigue en la serie: 🔺🔺🔺🔵🔺?", 
      options: ["🔵", "🔺", "🔺🔵", "🔺🔺🔺"], 
      answer: "🔺" 
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        updateScore('reasoning', score + (isCorrect ? 1 : 0)); // Asegura que la última respuesta correcta sea contada
        navigate(nextGame);
      }
    }, 1000); // Transición de 1 segundo
  };

  return (
    <div className="reasoning-aptitude-container">
      <h2 className="reasoning-aptitude-title">Prueba de Razonamiento</h2>
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

export default ReasoningAptitude;
