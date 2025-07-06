const Empregado = require("../models/empregado.model");

// Cria empregado
exports.create = async (req, res) => {
  if (!req.body.nome) {
    return res.status(400).send({ message: "Conteúdo vazio!" });
  }

  const empregado = new Empregado({
    nome: req.body.nome,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    salario: req.body.salario
  });

  try {
    await empregado.save();
    res.send(empregado);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Select todos por nome
exports.findAll = async (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { nome: { $regex: new RegExp(nome, "i") } } : {};

  try {
    const data = await Empregado.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando empregados." });
  }
};

// Acha um empregado por id
exports.findOne = async (req, res) => {
  try {
    const data = await Empregado.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não encontrado empregado com id=${req.params.id}.` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Erro recuperando empregado com id=" + req.params.id });
  }
};

// Atualiza por id
exports.update = async (req, res) => {
  try {
    const data = await Empregado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar empregado com id=${req.params.id}.`
      });
    }
    res.send({ message: "Empregado atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({ message: "Erro atualizando empregado com id=" + req.params.id });
  }
};

// Deleta por id
exports.delete = async (req, res) => {
  try {
    const data = await Empregado.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: `Não foi possível deletar empregado com id=${req.params.id}.` });
    }
    res.send({ message: "Empregado deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro deletando empregado com id=" + req.params.id });
  }
};

// Deleta todos
exports.deleteAll = async (req, res) => {
  try {
    const result = await Empregado.deleteMany({});
    res.send({ message: `${result.deletedCount} empregados deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro removendo todos os empregados." });
  }
};