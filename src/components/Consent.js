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
      <div className="data-authorization">
        <p>De conformidad con lo establecido por la Ley 1581 de 2012, el Decreto Reglamentario 1074 de 2015 y las demás normas que las modifiquen y/o amplíen, autorizo de manera libre, expresa e informada a la Universidad Pontificia Bolivariana para recolectar, almacenar, circular y utilizar los datos personales suministrados mediante el presente formato. El tratamiento de los datos personales estará sujeto a las siguientes finalidades: i) Comunicar mediante correos electrónicos, redes sociales, plataformas virtuales propias o determinadas por la institución, mensajes de texto, aplicaciones de mensajería instantánea y/o llamadas telefónicas, información institucional y/o promocional de la Universidad Pontificia Bolivariana. ii) Establecer contacto mediante llamadas telefónicas, mensajes de texto, aplicaciones de mensajería instantánea, redes sociales y/o correos electrónicos, con el fin de ofertar los programas académicos de pregrado y posgrado de la universidad, así como las demás actividades y capacitaciones académicas que desarrollen las diferentes áreas de la Universidad Pontificia Bolivariana, iii) Recibir información comercial propia de la actividad de la Institución. Manifiesto que he consultado en https://www.upb.edu.co el Manual de Políticas de Tratamiento de Información y Protección de los Datos Personales y certifico que conozco sobre mis derechos para solicitar la eliminación, rectificación, actualización y supresión de mis datos personales, mediante los canales dispuestos por la universidad.</p>
      </div>
    </div>
  );
};

export default Consent;
