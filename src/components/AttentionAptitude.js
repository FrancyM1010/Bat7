import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import '../Styles/AttentionAptitude.css'; // Si usas CSS

const AttentionAptitude = () => {
  const { updateScore } = useContext(GameContext);  // Tomamos el contexto
  const navigate = useNavigate();

  // Solo 2 preguntas con letras específicas a encontrar
  const questions = [
    { question: "Encuentra la letra 'Q'", correct: "Q" },
    { question: "Encuentra la letra 'X'", correct: "X" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);  // Índice de la pregunta actual
  const [score, setScore] = useState(0);  // Puntaje
  const [timeLeft, setTimeLeft] = useState(20);  // Tiempo por pregunta
  const [letters, setLetters] = useState(generateRandomLetters(questions[0].correct));  // Estado para las letras
  const [letterTimeLeft, setLetterTimeLeft] = useState(10);  // Temporizador para cambiar las letras cada 10 segundos

  // Generamos un conjunto de letras aleatorias, con una letra objetivo
  function generateRandomLetters(target) {
    const lettersArray = [];
    const targetIndex = Math.floor(Math.random() * 100);  // Generamos 100 letras
    for (let i = 0; i < 100; i++) {
      lettersArray.push(i === targetIndex ? target : String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }
    return lettersArray;
  }

  // Función para manejar el clic en una letra
  const handleLetterClick = (letter) => {
    if (letter === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);  // Aumentamos el puntaje si es correcto
    }
    nextQuestion();  // Pasamos a la siguiente pregunta o al final
  };

  // Función para avanzar a la siguiente pregunta o terminar
  const nextQuestion = () => {
    const nextQuestionIndex = currentQuestion + 1;

    setTimeLeft(20);  // Reiniciar el temporizador para la siguiente pregunta
    setLetterTimeLeft(10);  // Reiniciar el temporizador para las letras

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(nextQuestionIndex);
      setLetters(generateRandomLetters(questions[nextQuestionIndex].correct));  // Cambiamos las letras para la nueva pregunta
    } else {
      // Al finalizar, actualizamos el puntaje en el contexto con el valor actualizado
      updateScore('attention', score + 1);  // Pasamos el puntaje final al contexto (sumamos 1 porque React aún no ha actualizado el estado)
      navigate('/concentration');  // Navegamos a la siguiente prueba
    }
  };

  // Temporizador de 20 segundos por pregunta
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);  // Limpiamos el temporizador
    } else {
      // Si se acaba el tiempo, pasamos a la siguiente pregunta
      nextQuestion();
    }
  }, [timeLeft]);

  // Temporizador para cambiar las letras cada 10 segundos
  useEffect(() => {
    if (letterTimeLeft > 0) {
      const letterTimer = setTimeout(() => setLetterTimeLeft(letterTimeLeft - 1), 1000);
      return () => clearTimeout(letterTimer);
    } else {
      // Cambiamos las letras después de 10 segundos
      setLetters(generateRandomLetters(questions[currentQuestion].correct));
      setLetterTimeLeft(10);  // Reiniciamos el temporizador para las letras
    }
  }, [letterTimeLeft, currentQuestion, questions]);

  return (
    <div className="attention-aptitude-container">
      <h2>Prueba de Atención</h2>
      <div className="question-section">
        <p>{questions[currentQuestion].question}</p>
        <div className="letters-grid">
          {letters.map((letter, index) => (
            <span key={index} className="letter" onClick={() => handleLetterClick(letter)}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className="progress-section">
        <p>Tiempo restante para la pregunta: {timeLeft} segundos</p>
        <p>Cambio de letras en: {letterTimeLeft} segundos</p>
      </div>
    </div>
  );
};

export default AttentionAptitude;
