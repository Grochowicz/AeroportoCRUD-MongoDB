const PeritoEm = require("../models/perito_em.model");

// Cria perito_em 
exports.create = async (req, res) => {
  // Valida request
  if (!req.body.tecnico_peritoId || !req.body.modelo_especialidadeId) {
    return res.status(400).send({
      message: "Conteúdo vazio!"
    });
  }

  const perito_em = new PeritoEm({
    tecnico_peritoId: req.body.tecnico_peritoId,
    modelo_especialidadeId: req.body.modelo_especialidadeId
  });

  try {
    const data = await perito_em.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro criando perito_em."
    });
  }
};

// Select todos
exports.findAll = async (req, res) => {
  try {
    const data = await PeritoEm.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro recuperando perito_em."
    });
  }
};

// Acha um perito_em por id
exports.findOne = async (req, res) => {
  try {
    const data = await PeritoEm.findById(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não encontrado perito_em com id=${req.params.id}.`
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Erro recuperando perito_em com id=" + req.params.id
    });
  }
};

// Atualiza perito_em por id
exports.update = async (req, res) => {
  try {
    const data = await PeritoEm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar perito_em com id=${req.params.id}.`
      });
    }
    res.send({ message: "Perito_em atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({
      message: "Erro atualizando perito_em com id=" + req.params.id
    });
  }
};

// Deleta perito_em por id
exports.delete = async (req, res) => {
  try {
    const data = await PeritoEm.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível deletar perito_em com id=${req.params.id}.`
      });
    }
    res.send({ message: "Perito_em deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message: "Erro deletando perito_em com id=" + req.params.id
    });
  }
};

// Deleta todos os perito_em
exports.deleteAll = async (req, res) => {
  try {
    const result = await PeritoEm.deleteMany({});
    res.send({ message: `${result.deletedCount} perito_em deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro removendo todos os perito_em."
    });
  }
};

