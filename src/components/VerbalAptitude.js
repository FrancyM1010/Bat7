import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/VerbalAptitude.css';

const VerbalAptitude = () => {
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

  const currentGameIndex = gameSequence.indexOf("/verbal");
  const nextGame = gameSequence[currentGameIndex + 1];

  const questions = [
    {
      question: "ALTO es a BAJO como GRANDE es a .?...",
      options: ["VISIBLE", "GORDO", "PEQUEÑO", "POCO"],
      answer: "PEQUEÑO"
    },
    {
      question: "DÍA es a NOCHE como CALOR es a .?...",
      options: ["LUZ", "FRÍO", "CALIENTE", "CLARO"],
      answer: "FRÍO"
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackClass, setFeedbackClass] = useState('');

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);  // Asegura que la puntuación se incremente correctamente
      setFeedbackClass('correct');
    } else {
      setFeedbackClass('incorrect');
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setFeedbackClass('');
      } else {
        updateScore('verbal', score + (isCorrect ? 1 : 0));  // Asegura que la última respuesta se incluya en la puntuación final
        navigate(nextGame);
      }
    }, 1000);  // Pausa para mostrar el feedback antes de avanzar
  };

  return (
    <div className="verbal-aptitude-container">
      <h2 className="verbal-aptitude-title">Prueba de Aptitud Verbal</h2>
      <div className={`question-section ${feedbackClass}`}>
        <p className="question-text">{questions[currentQuestion].question}</p>
        <ul className="options-list">
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${feedbackClass}`}
              onClick={() => handleAnswerOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VerbalAptitude;
