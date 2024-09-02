import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importar el archivo CSS de la App

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
  );
}

export default App;
