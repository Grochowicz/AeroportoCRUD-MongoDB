import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PeritoEmDataService from "../services/PeritoEmService";

const PeritoEm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    id: null,
    tecnico_peritoId: "",
    modelo_especialidadeId: ""
  };

  const [peritoEm, setPeritoEm] = useState(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) getPeritoEm(id);
  }, [id]);

  const getPeritoEm = id => {
    PeritoEmDataService.get(id)
      .then(response => {
        setPeritoEm(response.data);
      })
      .catch(e => console.log(e));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPeritoEm({ ...peritoEm, [name]: value });
  };

  const updatePeritoEm = () => {
    PeritoEmDataService.update(peritoEm._id, peritoEm)
      .then(response => {
        setMessage("Relacionamento atualizado com sucesso!");
      })
      .catch(e => console.log(e));
  };

  const deletePeritoEm = () => {
    PeritoEmDataService.delete(peritoEm._id)
      .then(() => navigate("/perito_em"))
      .catch(e => console.log(e));
  };

  return (
    <div>
      {peritoEm ? (
        <div className="edit-form container mt-3">
          <h4>Perito em</h4>
          <form>
            <div className="form-group">
              <label htmlFor="tecnico_peritoId">ID do Técnico</label>
              <input
                type="text"
                className="form-control"
                id="tecnico_peritoId"
                value={peritoEm.tecnico_peritoId}
                onChange={handleInputChange}
                name="tecnico_peritoId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo_especialidadeId">ID do Modelo</label>
              <input
                type="text"
                className="form-control"
                id="modelo_especialidadeId"
                value={peritoEm.modelo_especialidadeId}
                onChange={handleInputChange}
                name="modelo_especialidadeId"
              />
            </div>
          </form>

          <button className="btn btn-danger" onClick={deletePeritoEm}>
            Deletar
          </button>

          <button className="btn btn-success" onClick={updatePeritoEm}>
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <p>Clique em um(a) perito_em</p>
      )}
    </div>
  );
};

export default PeritoEm;