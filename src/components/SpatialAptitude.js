import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/SpatialAptitude.css';

import Imagen1 from '../Images/Imagen1.png';
import Imagen2 from '../Images/Imagen2.png';
import Imagen3 from '../Images/Imagen3.png';
import Imagen4 from '../Images/Imagen4.png';
import Imagen5 from '../Images/Imagen5.png';
import Imagen6 from '../Images/Imagen6.png';
import Imagen7 from '../Images/Imagen7.png';
import Imagen8 from '../Images/Imagen8.png';
import Imagen9 from '../Images/Imagen9.png';
import Imagen10 from '../Images/Imagen10.png';

const SpatialAptitude = () => {
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

  const currentGameIndex = gameSequence.indexOf("/spatial");
  const nextGame = gameSequence[currentGameIndex + 1];

  const questions = [
    { 
      question: "Observa la figura y selecciona la opción que debería aparecer en lugar del interrogante.",
      image: Imagen1,
      options: [Imagen2, Imagen3, Imagen4, Imagen5],
      answer: Imagen3
    },
    { 
      question: "Observa la figura y selecciona la opción que debería aparecer en lugar del interrogante.",
      image: Imagen6,
      options: [Imagen7, Imagen8, Imagen9, Imagen10],
      answer: Imagen7
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(null);
  const [animation, setAnimation] = useState('');

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    setShowAnswer(isCorrect);

    if (isCorrect) setScore(score + 1);

    setAnimation(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setAnimation('');
        setShowAnswer(null);
      } else {
        updateScore('spatial', score + (isCorrect ? 1 : 0));  // Aseguramos que la última respuesta cuente si es correcta
        navigate(nextGame);  // Navegamos al siguiente juego sin mostrar el popup
      }
    }, 1000); 
  };

  return (
    <div className="spatial-aptitude-container">
      <h2 className="spatial-aptitude-title">Prueba de Aptitud Espacial</h2>
      <div className={`question-section ${animation}`}>
        <p className="question-text">{questions[currentQuestion].question}</p>
        <img className="question-image" src={questions[currentQuestion].image} alt="Pregunta Espacial" />
        <ul className="options-list">
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${showAnswer !== null ? (option === questions[currentQuestion].answer ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerOptionClick(option)}
            >
              <img src={option} alt={`Opción ${index}`} className="option-image" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpatialAptitude;
