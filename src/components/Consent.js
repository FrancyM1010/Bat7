import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Consent.css';

const Consent = () => {
  const navigate = useNavigate();

  const handleConsent = (consent) => {
    if (consent) {
      navigate('/home'); // Redirige al Home cuando se acepta
    } else {
      window.close(); // Cierra la ventana del navegador si no se acepta
    }
  };

  return (
    <div className="consent-container">
      <h2>Consentimiento Informado</h2>
      <p>Bienvenido a este conjunto de actividades. A continuación, te enfrentarás a una serie de ejercicios diseñados para analizar tus habilidades en diferentes áreas, como aptitud verbal, espacial, atención, concentración, razonamiento lógico, aptitud numérica, mecánica y ortografía.</p>
      <p>Estas pruebas están destinadas únicamente con fines informativos y no representan una evaluación profesional. Si deseas obtener una evaluación más detallada y precisa, te recomendamos realizar una prueba vocacional completa bajo la supervisión de un profesional en el área.</p>
      <p>Al continuar, aceptas participar en estas pruebas con el entendimiento de que los resultados se utilizarán para tu propia referencia personal.</p>
      <p>¿Deseas continuar?</p>
      <div className="consent-buttons">
        <button onClick={() => handleConsent(true)}>Sí, deseo continuar</button>
        <button onClick={() => handleConsent(false)}>No, cerrar el juego</button>
      </div>
    </div>
  );
};

export default Consent;
