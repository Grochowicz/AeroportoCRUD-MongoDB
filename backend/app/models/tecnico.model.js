const mongoose = require('mongoose');
// CREATE TABLE Tecnico (
// 	num_matricula INTEGER PRIMARY KEY,
// 	salario_base NUMERIC(10, 2),
// 	FOREIGN KEY(num_matricula) REFERENCES Empregado(num_matricula)
// );
const tecnicoSchema = new mongoose.Schema({
  empregadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empregado',
    required: true
  },
  salario_base: Number
});

const Tecnico = mongoose.model('Tecnico', tecnicoSchema);

module.exports = Tecnico;
