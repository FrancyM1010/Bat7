import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/OrthographyAptitude.css';

const OrthographyAptitude = () => {
  const { updateScore } = useContext(GameContext);
  const navigate = useNavigate();

  const questions = [
    { question: "¿Cuál palabra está mal escrita?", options: ["A. año", "B. berso", "C. vuelo", "D. campana"], answer: "B" },
    { question: "¿Cuál palabra está mal escrita?", options: ["A. bosque", "B. armario", "C. telon", "D. libro"], answer: "C" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion === questions.length - 1) {
      // Final question, update the score and navigate to results
      updateScore('orthography', score + (isCorrect ? 1 : 0)); // Include the last question's score
      navigate('/results');
    } else {
      // Proceed to next question
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
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
