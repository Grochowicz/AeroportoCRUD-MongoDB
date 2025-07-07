const Aviao = require("../models/aviao.model.js");

// Cria avião
exports.create = async (req, res) => {
  if (!req.body.modeloId) {
    return res.status(400).send({ message: "Conteúdo vazio!" });
  }

  const aviao = new Aviao({ modeloId: req.body.modeloId });

  try {
    await aviao.save();
    res.send(aviao);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Select todos
exports.findAll = async (req, res) => {
  try {
    let filtro = {};
    
    if (req.query.modeloId) {
  
      const mongoose = require('mongoose');
      filtro = { modeloId: new mongoose.Types.ObjectId(req.query.modeloId) };
    }
    
    const data = await Aviao.find(filtro);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro recuperando aviões." });
  }
};

// Acha um avião por id
exports.findOne = async (req, res) => {
  try {
    const data = await Aviao.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não encontrado avião com id=${req.params.id}.` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando avião com id=" + req.params.id });
  }
};

// Atualiza avião por id
exports.update = async (req, res) => {
  try {
    const data = await Aviao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({ message: `Não foi possível atualizar avião com id=${req.params.id}.` });
    }
    res.send({ message: "Avião atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({ message: "Erro atualizando avião com id=" + req.params.id });
  }
};

// Deleta avião por id
exports.delete = async (req, res) => {
  try {
    const data = await Aviao.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não foi possível deletar avião com id=${req.params.id}.` });
    }
    res.send({ message: "Avião deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro deletando avião com id=" + req.params.id });
  }
};

// Deleta todos os aviões
exports.deleteAll = async (req, res) => {
  try {
    const result = await Aviao.deleteMany({});
    res.send({ message: `${result.deletedCount} aviões deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro removendo todos os aviões." });
  }
};