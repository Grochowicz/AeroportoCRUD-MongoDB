const mongoose = require('mongoose');
// CREATE TABLE Modelo_de_aviao (
// 	cod_modelo SERIAL PRIMARY KEY,
// 	nome TEXT,
// 	capacidade INTEGER,
// 	peso NUMERIC(10,2)
// );
const modeloSchema = new mongoose.Schema({
  nome: String,
  capacidade: Number,
  peso: Number
});

const Modelo = mongoose.model('Modelo', modeloSchema, 'modelo');

module.exports = Modelo;
