const Teste = require("../models/teste.model");

// Cria teste 
exports.create = async (req, res) => {
  // Valida request
  if (!req.body.num_anac) {
    return res.status(400).send({
      message: "Conteúdo vazio!"
    });
  }

  const teste = new Teste({
    num_anac: req.body.num_anac,
    aviaoId: req.body.aviaoId,
    data: req.body.data,
    duracao_horas: req.body.duracao_horas,
    resultado: req.body.resultado,
    supervisor_tecnicoId: req.body.supervisor_tecnicoId
  });

  try {
    const data = await teste.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro criando teste."
    });
  }
};

// Select todos por num_anac
exports.findAll = async (req, res) => {
  const num_anac = req.query.num_anac;
  const condition = num_anac ? { num_anac: parseInt(num_anac) } : {};

  try {
    const data = await Teste.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro recuperando testes."
    });
  }
};

// Acha um teste por id
exports.findOne = async (req, res) => {
  try {
    const data = await Teste.findById(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não encontrado teste com id=${req.params.id}.`
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Erro recuperando teste com id=" + req.params.id
    });
  }
};

// Atualiza teste por id
exports.update = async (req, res) => {
  try {
    const data = await Teste.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível atualizar teste com id=${req.params.id}.`
      });
    }
    res.send({ message: "Teste atualizado com sucesso.", data });
  } catch (err) {
    res.status(500).send({
      message: "Erro atualizando teste com id=" + req.params.id
    });
  }
};

// Deleta teste por id
exports.delete = async (req, res) => {
  try {
    const data = await Teste.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Não foi possível deletar teste com id=${req.params.id}.`
      });
    }
    res.send({ message: "Teste deletado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message: "Erro deletando teste com id=" + req.params.id
    });
  }
};

// Deleta todos os testes
exports.deleteAll = async (req, res) => {
  try {
    const result = await Teste.deleteMany({});
    res.send({ message: `${result.deletedCount} testes deletados com sucesso!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Erro removendo todos os testes."
    });
  }
};

