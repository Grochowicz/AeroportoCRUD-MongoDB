const mongoose = require('mongoose');
// CREATE TABLE Empregado (
// 	num_matricula SERIAL PRIMARY KEY,
// 	nome TEXT,
// 	endereco TEXT,
// 	telefone VARCHAR(15),
// 	salario NUMERIC(10,2)
// );
const empregadoSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  telefone: String,
  salario: Number
});

const Empregado = mongoose.model('Empregado', empregadoSchema);

module.exports = Empregado;

