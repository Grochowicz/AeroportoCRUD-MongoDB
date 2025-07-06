const mongoose = require('mongoose');
// CREATE TABLE Controlador(
// 	num_matricula INTEGER PRIMARY KEY,
// 	ultimo_exame DATE,
// 	FOREIGN KEY(num_matricula) REFERENCES Empregado(num_matricula)
// );
const controladorSchema = new mongoose.Schema({
  empregadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empregado',
    required: true
  },
  ultimo_exame: Date
});

const Controlador = mongoose.model('Controlador', controladorSchema);

module.exports = Controlador;

