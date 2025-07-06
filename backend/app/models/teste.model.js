const mongoose = require('mongoose');
// CREATE TABLE Teste(
// 	num_anac INTEGER PRIMARY KEY,
// 	num_aviao INTEGER,
// 	data DATE,
// 	duracao_horas INTEGER,
// 	resultado TEXT,
// 	supervisor_tecnico INTEGER,
// 	FOREIGN KEY(num_aviao) REFERENCES Aviao(num_registro),
// 	FOREIGN KEY(supervisor_tecnico) REFERENCES Tecnico(num_matricula)
// );
const testeSchema = new mongoose.Schema({
  num_anac: {
    type: Number,
    required: true,
    unique: true
  },
  aviaoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aviao',
    required: true
  },
  data: Date,
  duracao_horas: Number,
  resultado: String,
  supervisor_tecnicoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tecnico',
    required: true
  }
});

const Teste = mongoose.model('Teste', testeSchema);

module.exports = Teste;
