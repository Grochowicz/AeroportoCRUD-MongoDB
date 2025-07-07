import React, { useState, useEffect } from "react";
import EmpregadoDataService from "../services/EmpregadoService";
import { Link } from "react-router-dom";


const EmpregadosList = () => {
  const [empregados, setEmpregados] = useState([]);
  const [currentEmpregado, setCurrentEmpregado] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");
  const [empregadoTypes, setEmpregadoTypes] = useState({});
  const [empregadoDetails, setEmpregadoDetails] = useState({});

  useEffect(() => {
    retrieveEmpregados();
  }, []);

  const onChangeSearchNome = e => {
    const searchNome = e.target.value;
    setSearchNome(searchNome);
  };

  const retrieveEmpregados = async () => {
    try {
      const { empregados, types, details } = await EmpregadoDataService.getAllWithTypes();
      setEmpregados(empregados);
      setEmpregadoTypes(types);
      setEmpregadoDetails(details);
      console.log(empregados);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshList = () => {
    retrieveEmpregados();
    setCurrentEmpregado(null);
    setCurrentIndex(-1);
  };

  const setActiveEmpregado = (empregado, index) => {
    setCurrentEmpregado(empregado);
    setCurrentIndex(index);
  };

  const removeAllEmpregados = () => {
    EmpregadoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNome = async () => {
    try {
      const { empregados, types, details } = await EmpregadoDataService.findByNomeWithTypes(searchNome);
      setEmpregados(empregados);
      setEmpregadoTypes(types);
      setEmpregadoDetails(details);
      console.log(empregados);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="list row container mt-3">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome"
            value={searchNome}
            onChange={onChangeSearchNome}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNome}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Empregados</h4>

        <ul className="list-group">
          {empregados &&
            empregados.map((empregado, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEmpregado(empregado, index)}
                key={index}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{empregado.nome}</span>
                  <span>
                    {empregadoTypes[empregado._id] || "Carregando..."}
                  </span>
                </div>
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEmpregados}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentEmpregado ? (
          <div>
            <h4>Empregado</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentEmpregado._id}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentEmpregado.nome}
            </div>
            <div>
              <label>
                <strong>Endereço:</strong>
              </label>{" "}
              {currentEmpregado.endereco}
            </div>
            <div>
              <label>
                <strong>Telefone:</strong>
              </label>{" "}
              {currentEmpregado.telefone}
            </div>
            <div>
              <label>
                <strong>Salário:</strong>
              </label>{" "}
              R$ {parseFloat(currentEmpregado.salario).toFixed(2)}
            </div>
            {empregadoTypes[currentEmpregado._id] === "Técnico" && empregadoDetails[currentEmpregado._id] && (
              <div>
                <label>
                  <strong>Salário Base:</strong>
                </label>{" "}
                R$ {parseFloat(empregadoDetails[currentEmpregado._id].salario_base).toFixed(2)}
              </div>
            )}
            {empregadoTypes[currentEmpregado._id] === "Controlador" && empregadoDetails[currentEmpregado._id] && (
              <div>
                <label>
                  <strong>Último Exame:</strong>
                </label>{" "}
                {new Date(empregadoDetails[currentEmpregado._id].ultimo_exame).toLocaleDateString('pt-BR')}
              </div>
            )}

            {empregadoTypes[currentEmpregado._id] === "Técnico" ? (
              <Link to={"/tecnicos/" + currentEmpregado._id}>
                Editar
              </Link>
            ) : empregadoTypes[currentEmpregado._id] === "Controlador" ? (
              <Link to={"/controladores/" + currentEmpregado._id}>
                Editar
              </Link>
            ) : (
              <Link to={"/empregados/" + currentEmpregado._id}>
                Editar
              </Link>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um empregado</p>
          </div>
        )}
      </div>
      <Link to="/addEmpregado" className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          zIndex: 999
        }}
        title="Adicionar Empregado"
      >
        +
      </Link>

    </div>
  );
};

export default EmpregadosList;