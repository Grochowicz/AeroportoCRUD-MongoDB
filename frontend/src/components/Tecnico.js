import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpregadoDataService from "../services/EmpregadoService";

const Tecnico = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTecnicoState = {
    _id: null,
    nome: "",
    endereco: "",
    telefone: "",
    salario: "",
    salario_base: ""
  };

  const [currentTecnico, setCurrentTecnico] = useState(initialTecnicoState);
  const [message, setMessage] = useState("");

  const getTecnico = async (id) => {
    try {

      const empregadoResponse = await EmpregadoDataService.get(id);
      const empregado = empregadoResponse.data;
      

      const tecnicoResponse = await EmpregadoDataService.getTecnicoDetails(id);
      const tecnico = tecnicoResponse.data && tecnicoResponse.data.length > 0 ? tecnicoResponse.data[0] : null;
      
      if (tecnico) {
        setCurrentTecnico({
          _id: empregado._id,
          nome: empregado.nome,
          endereco: empregado.endereco,
          telefone: empregado.telefone,
          salario: empregado.salario,
          salario_base: tecnico.salario_base
        });
      } else {
        setMessage("Técnico não encontrado!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) getTecnico(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTecnico({ ...currentTecnico, [name]: value });
  };

  const updateTecnico = async () => {
    try {

      await EmpregadoDataService.update(currentTecnico._id, {
        nome: currentTecnico.nome,
        endereco: currentTecnico.endereco,
        telefone: currentTecnico.telefone,
        salario: currentTecnico.salario
      });


      const tecnicoResponse = await EmpregadoDataService.getTecnicoDetails(currentTecnico._id);
      if (tecnicoResponse.data && tecnicoResponse.data.length > 0) {
        const tecnicoId = tecnicoResponse.data[0]._id;
        await EmpregadoDataService.updateTecnico(tecnicoId, {
          salario_base: currentTecnico.salario_base
        });
      }

      setMessage("Técnico atualizado com sucesso!");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTecnico = async () => {
    try {
      await EmpregadoDataService.delete(currentTecnico._id);
      setMessage("Técnico deletado com sucesso!");
      navigate("/empregados");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {currentTecnico ? (
        <div className="edit-form">
          <h4>Técnico</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={currentTecnico.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                name="endereco"
                value={currentTecnico.endereco}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                name="telefone"
                value={currentTecnico.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="salario">Salário</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="salario"
                name="salario"
                value={currentTecnico.salario}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="salario_base">Salário Base</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="salario_base"
                name="salario_base"
                value={currentTecnico.salario_base}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deleteTecnico}>
            Deletar
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateTecnico}
          >
            Atualizar
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Carregando...</p>
        </div>
      )}
    </div>
  );
};

export default Tecnico; 