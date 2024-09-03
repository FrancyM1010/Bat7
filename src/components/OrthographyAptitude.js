import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/OrthographyAptitude.css';

const OrthographyAptitude = () => {
  const { updateScore } = useContext(GameContext);
  const navigate = useNavigate();

  // Reducido a solo dos preguntas
  const questions = [
    { question: "¿Cuál palabra está mal escrita?", options: ["A. año", "B. berso", "C. vuelo", "D. campana"], answer: "B" },
    { question: "¿Cuál palabra está mal escrita?", options: ["A. bosque", "B. armario", "C. telon", "D. libro"], answer: "C" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      updateScore('orthography', score);  // No se suma 1, ya que eso se hace solo si la respuesta es correcta
      navigate('/results');
    }
  };

  return (
    <div className="orthography-aptitude-container">
      <h2 className="orthography-aptitude-title">Prueba de Ortografía</h2>
      <div className="question-section">
        <p className="question-text">{questions[currentQuestion].question}</p>
        <ul className="options-list">
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className="option-item"
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

export default OrthographyAptitude;
