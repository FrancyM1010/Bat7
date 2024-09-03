import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { GameProvider } from './components/GameContext';
import Home from './components/Home';
import VerbalAptitude from './components/VerbalAptitude';
import SpatialAptitude from './components/SpatialAptitude';
import AttentionAptitude from './components/AttentionAptitude';
import ConcentrationAptitude from './components/ConcentrationAptitude';
import ReasoningAptitude from './components/ReasoningAptitude';
import NumericalAptitude from './components/NumericalAptitude';
import MechanicalAptitude from './components/MechanicalAptitude';
import OrthographyAptitude from './components/OrthographyAptitude';
import Results from './components/Results';
import Consent from './components/Consent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Logo from './Images/Logo.jpg';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div className="logo-container">
      <img src={Logo} alt="Logo UPB" className="logo-upb" />
      <p className="logo-text">Juego diseñado por: Francy Moreno</p>
    </div>
    <GameProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Consent />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verbal" element={<VerbalAptitude />} />
          <Route path="/spatial" element={<SpatialAptitude />} />
          <Route path="/attention" element={<AttentionAptitude />} />
          <Route path="/concentration" element={<ConcentrationAptitude />} />
          <Route path="/reasoning" element={<ReasoningAptitude />} />
          <Route path="/numerical" element={<NumericalAptitude />} />
          <Route path="/mechanical" element={<MechanicalAptitude />} />
          <Route path="/orthography" element={<OrthographyAptitude />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </GameProvider>
  </React.StrictMode>
);
