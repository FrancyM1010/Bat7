const express = require('express');
const Result = require('../models/Result');
const router = express.Router();

// Enviar resultados
router.post('/submit-results', async (req, res) => {
  const { userId, verbal, espacial, atencion, concentracion, razonamiento, numerica, mecanica, ortografia, wantsContact } = req.body;

  // Verificar campos requeridos
  if (!userId || !verbal || !espacial || !atencion || !concentracion || !razonamiento || !numerica || !mecanica || !ortografia) {
    return res.status(400).json({ msg: 'Todos los campos son requeridos.' });
  }

  try {
    const result = new Result({ userId, verbal, espacial, atencion, concentracion, razonamiento, numerica, mecanica, ortografia, wantsContact });
    await result.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los resultados
router.get('/get-results', async (req, res) => {
  try {
    const results = await Result.find().populate('userId', 'nombre email phone');
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Obtener usuarios que desean ser contactados
router.get('/get-contacted-users', async (req, res) => {
  try {
    const contactedUsers = await Result.find({ wantsContact: true }).populate('userId', 'nombre email phone');
    res.json(contactedUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
