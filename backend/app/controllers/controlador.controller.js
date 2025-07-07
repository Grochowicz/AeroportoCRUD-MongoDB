const Controlador = require("../models/controlador.model");

// Cria controlador
exports.create = async (req, res) => {
  if (!req.body.empregadoId) {
    return res.status(400).send({ message: "Conteúdo vazio!" });
  }

  const controlador = new Controlador({
    empregadoId: req.body.empregadoId,
    ultimo_exame: req.body.ultimo_exame
  });

  try {
    const data = await controlador.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Select todos
exports.findAll = async (req, res) => {
  try {
    const empregadoId = req.query.empregadoId;
    let condition = {};
    
    if (empregadoId) {
  
      const mongoose = require('mongoose');
      condition = { empregadoId: new mongoose.Types.ObjectId(empregadoId) };
    }
    
    const data = await Controlador.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro recuperando controladores." });
  }
};

// Acha um controlador por ID
exports.findOne = async (req, res) => {
  try {
    const data = await Controlador.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não encontrado controlador com id=${req.params.id}.` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando controlador com id=" + req.params.id });
  }
};

// Atualiza por ID
exports.update = async (req, res) => {
  try {
    const data = await Controlador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar controlador com id=${req.params.id}. Pode não ter sido encontrado ou req.body está vazio!`
      });
    }
    res.send({ message: "Controlador atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({ message: "Erro atualizando controlador com id=" + req.params.id });
  }
};

// Deleta por ID
exports.delete = async (req, res) => {
  try {
    const data = await Controlador.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não foi possível deletar controlador com id=${req.params.id}. Pode não ter sido encontrado!` });
    }
    res.send({ message: "Controlador deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro deletando controlador com id=" + req.params.id });
  }
};

// Deleta todos
exports.deleteAll = async (req, res) => {
  try {
    const result = await Controlador.deleteMany({});
    res.send({ message: `${result.deletedCount} controladores deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro removendo todos os controladores." });
  }
};