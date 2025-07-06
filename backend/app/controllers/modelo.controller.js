const Modelo = require("../models/modelo.model");

// Cria modelo
exports.create = async (req, res) => {
  if (!req.body.nome) {
    return res.status(400).send({ message: "Conteúdo vazio!" });
  }

  const modelo = new Modelo({
    nome: req.body.nome,
    capacidade: req.body.capacidade,
    peso: req.body.peso
  });

  try {
    await modelo.save();
    res.send(modelo);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Select todos por nome
exports.findAll = async (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { nome: { $regex: new RegExp(nome, "i") } } : {};

  try {
    const data = await Modelo.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando modelos." });
  }
};

// Acha um modelo por id
exports.findOne = async (req, res) => {
  try {
    const data = await Modelo.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não encontrado modelo com id=${req.params.id}.` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando modelo com id=" + req.params.id });
  }
};

// Atualiza modelo por id
exports.update = async (req, res) => {
  try {
    const data = await Modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar modelo com id=${req.params.id}.`
      });
    }
    res.send({ message: "Modelo atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({ message: "Erro atualizando modelo com id=" + req.params.id });
  }
};

// Deleta modelo por id
exports.delete = async (req, res) => {
  try {
    const data = await Modelo.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não foi possível deletar modelo com id=${req.params.id}.` });
    }
    res.send({ message: "Modelo deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro deletando modelo com id=" + req.params.id });
  }
};

// Deleta todos os modelos
exports.deleteAll = async (req, res) => {
  try {
    const result = await Modelo.deleteMany({});
    res.send({ message: `${result.deletedCount} modelos deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro removendo todos os modelos." });
  }
};

