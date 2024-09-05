const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verbal: { type: Number, required: true },
  espacial: { type: Number, required: true },
  atencion: { type: Number, required: true },
  concentracion: { type: Number, required: true },
  razonamiento: { type: Number, required: true },
  numerica: { type: Number, required: true },
  mecanica: { type: Number, required: true },
  ortografia: { type: Number, required: true },
  wantsContact: { type: Boolean, default: false },  // Nuevo campo agregado
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
