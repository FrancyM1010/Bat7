import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/SpatialAptitude.css';

// Importar imágenes locales
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
import Imagen11 from '../Images/Imagen11.png';
import Imagen12 from '../Images/Imagen12.png';
import Imagen13 from '../Images/Imagen13.png';
import Imagen14 from '../Images/Imagen14.png';
import Imagen15 from '../Images/Imagen15.png';
import Imagen16 from '../Images/Imagen16.png';
import Imagen17 from '../Images/Imagen17.png';
import Imagen18 from '../Images/Imagen18.png';
import Imagen19 from '../Images/Imagen19.png';
import Imagen20 from '../Images/Imagen20.png';
import Imagen21 from '../Images/Imagen21.png';
import Imagen22 from '../Images/Imagen22.png';
import Imagen23 from '../Images/Imagen23.png';
import Imagen24 from '../Images/Imagen24.png';
import Imagen25 from '../Images/Imagen25.png';
import Imagen26 from '../Images/Imagen26.png';
import Imagen27 from '../Images/Imagen27.png';
import Imagen28 from '../Images/Imagen28.png';
import Imagen29 from '../Images/Imagen29.png';
import Imagen30 from '../Images/Imagen30.png';

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
    },
    
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
        updateScore('spatial', score + 1);
        alert(`¡Has completado la prueba! Tu puntaje es ${score + 1}/${questions.length}`);
        navigate(nextGame);
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
