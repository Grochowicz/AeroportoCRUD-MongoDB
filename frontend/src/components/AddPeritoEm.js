import React, { useState } from "react";
import PeritoEmDataService from "../services/PeritoEmService";

const AddPeritoEm = () => {
  const initialState = {
    id: null,
    tecnico_peritoId: "",
    modelo_especialidadeId: ""
  };

  const [peritoEm, setPeritoEm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPeritoEm({ ...peritoEm, [name]: value });
  };

  const savePeritoEm = () => {
    PeritoEmDataService.create(peritoEm)
      .then(response => {
        setPeritoEm({
          id: response.data._id,
          tecnico_peritoId: response.data.tecnico_peritoId,
          modelo_especialidadeId: response.data.modelo_especialidadeId
        });
        setSubmitted(true);
      })
      .catch(e => console.log(e));
  };

  const newPeritoEm = () => {
    setPeritoEm(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form container mt-3">
      {submitted ? (
        <div>
          <h4>Relacionamento cadastrado com sucesso!</h4>
          <button className="btn btn-success" onClick={newPeritoEm}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="tecnico_peritoId">ID do Técnico</label>
            <input
              type="text"
              className="form-control"
              id="tecnico_peritoId"
              required
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
              required
              value={peritoEm.modelo_especialidadeId}
              onChange={handleInputChange}
              name="modelo_especialidadeId"
            />
          </div>

          <button onClick={savePeritoEm} className="btn btn-success">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPeritoEm;