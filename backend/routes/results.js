const express = require('express');
const Result = require('../models/Result');
const router = express.Router();

// Enviar resultados
router.post('/submit-results', async (req, res) => {
  const { userId, verbal, espacial, atencion, concentracion, razonamiento, numerica, mecanica, ortografia } = req.body;
  try {
    const result = new Result({ userId, verbal, espacial, atencion, concentracion, razonamiento, numerica, mecanica, ortografia });
    await result.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Obtener resultados
router.get('/get-results/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
