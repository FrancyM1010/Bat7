import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/MechanicalAptitude.css';

const MechanicalAptitude = () => {
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

  const currentGameIndex = gameSequence.indexOf("/mechanical");
  const nextGame = gameSequence[currentGameIndex + 1];

  const questions = [
    { 
      question: "Si un coche viaja a 60 km/h durante 2 horas, ¿qué distancia recorrerá?", 
      options: ["120 km", "100 km", "150 km", "90 km"], 
      answer: "120 km" 
    },
    { 
      question: "Una polea reduce a la mitad la fuerza necesaria para levantar un objeto. Si el objeto pesa 200 kg, ¿cuánta fuerza es necesaria?", 
      options: ["100 kg", "200 kg", "50 kg", "400 kg"], 
      answer: "100 kg" 
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    setScore(prevScore => isCorrect ? prevScore + 1 : prevScore); // Asegura que se actualice correctamente la puntuación
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        updateScore('mechanical', isCorrect ? score + 1 : score); // Asegura que la última pregunta se cuente
        alert(`¡Has completado la prueba! Tu puntaje es ${isCorrect ? score + 1 : score}/${questions.length}`);
        navigate(nextGame);
      }
    }, 1000); // Transición de 1 segundo
  };

  return (
    <div className="mechanical-aptitude-container">
      <h2 className="mechanical-aptitude-title">Prueba de Aptitud Mecánica</h2>
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

export default MechanicalAptitude;
