const Tecnico = require("../models/tecnico.model");

// Cria tecnico 
exports.create = async (req, res) => {
  // Valida request
  if (!req.body.empregadoId) {
    return res.status(400).send({
      message: "Conteúdo vazio!"
    });
  }

  const tecnico = new Tecnico({
    empregadoId: req.body.empregadoId,
    salario_base: req.body.salario_base
  });

  try {
    const data = await tecnico.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro criando técnico."
    });
  }
};

// Select todos
exports.findAll = async (req, res) => {
  try {
    const data = await Tecnico.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro recuperando técnicos."
    });
  }
};

// Acha um técnico por id
exports.findOne = async (req, res) => {
  try {
    const data = await Tecnico.findById(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não encontrado técnico com id=${req.params.id}.`
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Erro recuperando técnico com id=" + req.params.id
    });
  }
};

// Atualiza técnico por id
exports.update = async (req, res) => {
  try {
    const data = await Tecnico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar técnico com id=${req.params.id}.`
      });
    }
    res.send({ message: "Técnico atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({
      message: "Erro atualizando técnico com id=" + req.params.id
    });
  }
};

// Deleta técnico por id
exports.delete = async (req, res) => {
  try {
    const data = await Tecnico.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível deletar técnico com id=${req.params.id}.`
      });
    }
    res.send({ message: "Técnico deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message: "Erro deletando técnico com id=" + req.params.id
    });
  }
};

// Deleta todos os técnicos
exports.deleteAll = async (req, res) => {
  try {
    const result = await Tecnico.deleteMany({});
    res.send({ message: `${result.deletedCount} técnicos deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro removendo todos os técnicos."
    });
  }
};

