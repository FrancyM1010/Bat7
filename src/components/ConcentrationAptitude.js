import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/ConcentrationAptitude.css';

const ConcentrationAptitude = () => {
  const { updateScore } = useContext(GameContext);
  const navigate = useNavigate();

  const questions = [
    { question: "Cuenta el número de 'A's y 'B's en el texto", text: "AABBBCCCAAAIIIDDDDBBB", answer: 11 },
    { question: "Cuenta el número de 'M's y 'N's en el texto", text: "MMMÑÑÑÑÑNNNNMOOOMMPPPN", answer: 10 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const handleAnswerSubmit = () => {
    if (parseInt(userAnswer, 10) === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setUserAnswer('');  // Reiniciar la respuesta del usuario
    } else {
      updateScore('concentration', score + 1);  // Asegúrate de que se pase la puntuación final
      navigate('/reasoning');
    }
  };

  useEffect(() => {
    // Reset score at the beginning
    setScore(0);
  }, []);

  return (
    <div className="concentration-aptitude-container">
      <h2 className="concentration-aptitude-title">Prueba de Concentración</h2>
      <div className="question-section">
        <p className="question-text">{questions[currentQuestion].question}</p>
        <p className="text-to-count">{questions[currentQuestion].text}</p>
        <input
          type="number"
          value={userAnswer}
          placeholder="0"
          className="answer-input"
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button className="submit-button" onClick={handleAnswerSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default ConcentrationAptitude;
