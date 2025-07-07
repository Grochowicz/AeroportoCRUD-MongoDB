const mongoose = require('mongoose');
// CREATE TABLE Perito_em(
// 	tecnico_perito INTEGER,
// 	modelo_especialidade INTEGER,
// 	PRIMARY KEY(tecnico_perito, modelo_especialidade),
// 	FOREIGN KEY(tecnico_perito) REFERENCES Tecnico(num_matricula),
// 	FOREIGN KEY(modelo_especialidade) REFERENCES Modelo_de_aviao(cod_modelo)
// );
const peritoEmSchema = new mongoose.Schema({
  tecnico_peritoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tecnico',
    required: true
  },
  modelo_especialidadeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo',
    required: true
  }
}, {
  timestamps: false
});


peritoEmSchema.index({ tecnico_peritoId: 1, modelo_especialidadeId: 1 }, { unique: true });

const PeritoEm = mongoose.model('PeritoEm', peritoEmSchema, 'perito_em');

module.exports = PeritoEm;
