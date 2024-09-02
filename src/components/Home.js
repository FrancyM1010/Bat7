import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);

  const handleStartClick = () => {
    setStartAnimation(true);
    setTimeout(() => {
      navigate('/verbal');
    }, 1000); // Espera 1 segundo antes de navegar al primer juego
  };

  return (
    <div className={`home-container ${startAnimation ? 'fade-out' : 'fade-in'}`}>
      <h1 className="home-title">Bienvenido a la Aventura Vocacional</h1>
      <p className="home-subtitle">Explora tus habilidades y descubre tu vocación</p>
      <button className="start-button" onClick={handleStartClick}>
        Comienza tu Aventura
      </button>
      <div className="animated-elements">
        {/* Elementos adicionales para hacer la pantalla más dinámica */}
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>
    </div>
  );
};

export default Home;
