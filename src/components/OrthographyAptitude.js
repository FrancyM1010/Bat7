import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/OrthographyAptitude.css';

const OrthographyAptitude = () => {
  const { updateScore } = useContext(GameContext);  // Tomamos el contexto
  const navigate = useNavigate();

  // Lista de preguntas de ortografía
  const questions = [
    { question: "¿Cuál palabra está mal escrita?", options: ["A. año", "B. berso", "C. vuelo", "D. campana"], correct: "B" },
    { question: "¿Cuál palabra está mal escrita?", options: ["A. bosque", "B. armario", "C. telon", "D. libro"], correct: "C" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);  // Índice de la pregunta actual
  const [score, setScore] = useState(0);  // Puntaje guardado en el estado
  const [showFeedback, setShowFeedback] = useState(null); // Feedback de correcto/incorrecto

  // Función para manejar la selección de respuesta
  const handleAnswerClick = (option) => {
    const selectedOption = option[0];  // Selecciona solo la letra, ej. 'A', 'B', 'C', etc.
    const isCorrect = selectedOption === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);  // Aumentamos el puntaje si la respuesta es correcta
    }
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setShowFeedback(null); // Limpiamos el feedback después de 1 segundo
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);  // Pasamos a la siguiente pregunta
      } else {
        // Al finalizar, actualizamos el puntaje en el contexto
        updateScore('orthography', score + (isCorrect ? 1 : 0));  // Actualizamos el puntaje final y lo pasamos al contexto
        navigate('/results');  // Redirigimos a la página de resultados
      }
    }, 1000); // Transición de 1 segundo para mostrar el feedback
  };

  return (
    <div className="orthography-aptitude-container">
      <h2 className="orthography-aptitude-title">Prueba de Ortografía</h2>
      <div className="question-section">
        <p>{questions[currentQuestion].question}</p>
        <ul className="options-list">
          {questions[currentQuestion].options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${showFeedback}`}
              onClick={() => handleAnswerClick(option)}
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

export default OrthographyAptitude;
