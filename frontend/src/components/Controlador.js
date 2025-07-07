import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpregadoDataService from "../services/EmpregadoService";

const Controlador = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialControladorState = {
    _id: null,
    nome: "",
    endereco: "",
    telefone: "",
    salario: "",
    ultimo_exame: ""
  };

  const [currentControlador, setCurrentControlador] = useState(initialControladorState);
  const [message, setMessage] = useState("");

  const getControlador = async (id) => {
    try {

      const empregadoResponse = await EmpregadoDataService.get(id);
      const empregado = empregadoResponse.data;
      

      const controladorResponse = await EmpregadoDataService.getControladorDetails(id);
      const controlador = controladorResponse.data && controladorResponse.data.length > 0 ? controladorResponse.data[0] : null;
      
      if (controlador) {
        setCurrentControlador({
          _id: empregado._id,
          nome: empregado.nome,
          endereco: empregado.endereco,
          telefone: empregado.telefone,
          salario: empregado.salario,
          ultimo_exame: controlador.ultimo_exame ? controlador.ultimo_exame.split('T')[0] : ""
        });
      } else {
        setMessage("Controlador não encontrado!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) getControlador(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentControlador({ ...currentControlador, [name]: value });
  };

  const updateControlador = async () => {
    try {

      await EmpregadoDataService.update(currentControlador._id, {
        nome: currentControlador.nome,
        endereco: currentControlador.endereco,
        telefone: currentControlador.telefone,
        salario: currentControlador.salario
      });


      const controladorResponse = await EmpregadoDataService.getControladorDetails(currentControlador._id);
      if (controladorResponse.data && controladorResponse.data.length > 0) {
        const controladorId = controladorResponse.data[0]._id;
        await EmpregadoDataService.updateControlador(controladorId, {
          ultimo_exame: currentControlador.ultimo_exame
        });
      }

      setMessage("Controlador atualizado com sucesso!");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteControlador = async () => {
    try {
      await EmpregadoDataService.delete(currentControlador._id);
      setMessage("Controlador deletado com sucesso!");
      navigate("/empregados");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {currentControlador ? (
        <div className="edit-form">
          <h4>Controlador</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={currentControlador.nome}
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
                value={currentControlador.endereco}
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
                value={currentControlador.telefone}
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
                value={currentControlador.salario}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ultimo_exame">Último Exame</label>
              <input
                type="date"
                className="form-control"
                id="ultimo_exame"
                name="ultimo_exame"
                value={currentControlador.ultimo_exame}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deleteControlador}>
            Deletar
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateControlador}
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

export default Controlador; 