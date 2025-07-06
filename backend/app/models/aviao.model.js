const mongoose = require('mongoose');
// CREATE TABLE Aviao (
// 	num_registro SERIAL PRIMARY KEY,
// 	modelo INTEGER,
// 	FOREIGN KEY (modelo) REFERENCES Modelo_de_aviao(cod_modelo)
// );
const aviaoSchema = new mongoose.Schema({
  modeloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo',
    required: true
  }
});

const Aviao = mongoose.model('Aviao', aviaoSchema);

module.exports = Aviao;

