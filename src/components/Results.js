import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from './GameContext';
import { Bar } from 'react-chartjs-2';
import generatePDF from './ReportGenerator';
import { Chart, registerables } from 'chart.js';
import '../Styles/Results.css';

Chart.register(...registerables);

const Results = () => {
  const { scores } = useContext(GameContext);
  const [userData, setUserData] = useState({ name: '', age: '', email: '', phone: '', wantsContact: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log('Updated Scores:', scores);
  }, [scores]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.name && userData.age && userData.email && userData.phone) {
      setIsSubmitted(true);
      if (userData.wantsContact) {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const toPercentage = (score, maxScore) => {
    return ((score / maxScore) * 100).toFixed(2);
  };

  const maxScore = 2;

  const chartData = {
    labels: [
      'Aptitud Verbal',
      'Aptitud Espacial',
      'Atención',
      'Concentración',
      'Razonamiento',
      'Aptitud Numérica',
      'Aptitud Mecánica',
      'Ortografía',
    ],
    datasets: [
      {
        label: 'Puntuaciones (%)',
        data: [
          toPercentage(scores.verbal, maxScore),
          toPercentage(scores.spatial, maxScore),
          toPercentage(scores.attention, maxScore),
          toPercentage(scores.concentration, maxScore),
          toPercentage(scores.reasoning, maxScore),
          toPercentage(scores.numerical, maxScore),
          toPercentage(scores.mechanical, maxScore),
          toPercentage(scores.orthography, maxScore),
        ],
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      }
    ],
  };

  const reportData = {
    ...userData,
    testDate: new Date().toLocaleDateString(),
    verbalScore: `${toPercentage(scores.verbal, maxScore)}%`,
    spatialScore: `${toPercentage(scores.spatial, maxScore)}%`,
    attentionScore: `${toPercentage(scores.attention, maxScore)}%`,
    concentrationScore: `${toPercentage(scores.concentration, maxScore)}%`,
    reasoningScore: `${toPercentage(scores.reasoning, maxScore)}%`,
    numericalScore: `${toPercentage(scores.numerical, maxScore)}%`,
    mechanicalScore: `${toPercentage(scores.mechanical, maxScore)}%`,
    orthographyScore: `${toPercentage(scores.orthography, maxScore)}%`,
    interpretation: generateInterpretation(scores, maxScore, userData.age),
  };

  return (
    <div className="results-container">
      {!isSubmitted ? (
        <div className="user-data-form">
          <h1>Introduce tus datos</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Edad:
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo Electrónico:
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="wantsContact"
                checked={userData.wantsContact}
                onChange={handleChange}
              />
              ¿Deseas que te contactemos para orientación vocacional?
            </label>
            <button type="submit">Ver Resultados</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Resultados</h1>
          <div className="chart-container">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Puntuaciones en Aptitudes (%)',
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>

          <div className="results-summary">
            <h2>Resumen de Resultados</h2>
            <ResultCard title="Aptitud Verbal" score={reportData.verbalScore} />
            <ResultCard title="Aptitud Espacial" score={reportData.spatialScore} />
            <ResultCard title="Atención" score={reportData.attentionScore} />
            <ResultCard title="Concentración" score={reportData.concentrationScore} />
            <ResultCard title="Razonamiento" score={reportData.reasoningScore} />
            <ResultCard title="Aptitud Numérica" score={reportData.numericalScore} />
            <ResultCard title="Aptitud Mecánica" score={reportData.mechanicalScore} />
            <ResultCard title="Ortografía" score={reportData.orthographyScore} />
          </div>

          <div className="interpretation">
            <h2>Interpretación</h2>
            <p
              className="interpretation-text"
              dangerouslySetInnerHTML={{ __html: reportData.interpretation }}
            ></p>

            <div className="contact-info">
              <h3 style={{ textAlign: 'center', color: '#d32f2f', marginTop: '20px' }}>
                ¿Deseas una consulta de orientación vocacional profesional?
              </h3>
              <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#d32f2f', fontWeight: 'bold' }}>
                Comunícate con nosotros: <br />
                <a href="mailto:labpsicologia.bga@upb.edu.co" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  labpsicologia.bga@upb.edu.co
                </a> <br />
                Tel: (607) 6796220 Ext:20641
              </p>
            </div>
          </div>

          <button className="download-pdf-button" onClick={() => generatePDF(reportData)}>
            Descargar PDF
          </button>
        </>
      )}
    </div>
  );
};

const ResultCard = ({ title, score }) => (
  <div className="result-card">
    <h3>{title}</h3>
    <p>{score}</p>
  </div>
);


const generateInterpretation = (scores, maxScore, age) => {
  const toPercentage = (score, maxScore) => {
    return ((score / maxScore) * 100).toFixed(2);
  };

  let interpretation = "<strong>Áreas de Fortaleza:</strong><br>";
  let hasStrengths = false;

  if (toPercentage(scores.verbal, maxScore) > 75) {
    interpretation += "<strong>Aptitud Verbal:</strong> Excelente en comunicación y lenguaje, ideal para Derecho, Periodismo, o Educación.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.spatial, maxScore) > 75) {
    interpretation += "<strong>Habilidad Espacial:</strong> Destacas en visualización tridimensional, ideal para Arquitectura, Ingeniería, o Diseño.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.attention, maxScore) > 75) {
    interpretation += "<strong>Atención:</strong> Alta capacidad de concentración y precisión, útil en Medicina, Ciencias Exactas, o Software.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.concentration, maxScore) > 75) {
    interpretation += "<strong>Concentración:</strong> Enfoque prolongado, esencial para Investigación, Programación, o Física.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.reasoning, maxScore) > 75) {
    interpretation += "<strong>Razonamiento Lógico:</strong> Capacidad analítica excepcional, ideal para Matemáticas, Física, o Ingeniería.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.numerical, maxScore) > 75) {
    interpretation += "<strong>Aptitud Numérica:</strong> Excelente en números, perfecta para Finanzas, Economía, o Ingeniería.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.mechanical, maxScore) > 75) {
    interpretation += "<strong>Habilidad Mecánica:</strong> Destacado en mecánica, ideal para Ingeniería, Robótica, o Tecnología.<br>";
    hasStrengths = true;
  }

  if (toPercentage(scores.orthography, maxScore) > 75) {
    interpretation += "<strong>Ortografía:</strong> Excelente en redacción, ideal para Literatura, Periodismo, o Traducción.<br>";
    hasStrengths = true;
  }

  if (!hasStrengths) {
    interpretation = "No se han identificado fortalezas sobresalientes, pero puedes seguir desarrollando tus habilidades actuales.<br>";
  } else {
    interpretation += "<br><strong>Áreas de Mejora:</strong><br>";

    if (toPercentage(scores.verbal, maxScore) <= 75) {
      interpretation += "<strong>Aptitud Verbal:</strong> Considera mejorar en comunicación y lenguaje a través de la práctica continua.<br>";
    }

    if (toPercentage(scores.spatial, maxScore) <= 75) {
      interpretation += "<strong>Habilidad Espacial:</strong> Practica ejercicios de visualización para mejorar en campos técnicos y creativos.<br>";
    }

    if (toPercentage(scores.attention, maxScore) <= 75) {
      interpretation += "<strong>Atención:</strong> Mejora tu enfoque con técnicas de mindfulness y ejercicios cognitivos.<br>";
    }

    if (toPercentage(scores.concentration, maxScore) <= 75) {
      interpretation += "<strong>Concentración:</strong> Fortalece tu capacidad de concentración con tareas exigentes y gestión del tiempo.<br>";
    }

    if (toPercentage(scores.reasoning, maxScore) <= 75) {
      interpretation += "<strong>Razonamiento Lógico:</strong> Desarrolla tu capacidad analítica con problemas complejos y lógica formal.<br>";
    }

    if (toPercentage(scores.numerical, maxScore) <= 75) {
      interpretation += "<strong>Aptitud Numérica:</strong> Mejora tu habilidad en números con estudios avanzados en matemáticas y estadísticas.<br>";
    }

    if (toPercentage(scores.mechanical, maxScore) <= 75) {
      interpretation += "<strong>Habilidad Mecánica:</strong> Amplía tus conocimientos en mecánica con proyectos prácticos y robótica.<br>";
    }

    if (toPercentage(scores.orthography, maxScore) <= 75) {
      interpretation += "<strong>Ortografía:</strong> Perfecciona tu redacción con corrección de pruebas y talleres de escritura.<br>";
    }
  }

  interpretation += "<br><strong>Disclaimer:</strong> Este reporte tiene fines únicamente informativos. Para una evaluación más profunda y profesional de tus aptitudes y vocaciones, se recomienda realizar una prueba vocacional con un especialista.";

  return interpretation;
};

export default Results;
