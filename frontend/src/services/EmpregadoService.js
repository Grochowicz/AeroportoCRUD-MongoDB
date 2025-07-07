import http from "../http-common";

class EmpregadoDataService {
  getAll() {
    return http.get("/empregados");
  }

  get(id) {
    return http.get(`/empregados/${id}`);
  }

  create(data) {
    return http.post("/empregados", data);
  }

  createControlador(data) {
    return http.post("/controladores", data);
  }

  createTecnico(data) {
    return http.post("/tecnicos", data);
  }

  update(id, data) {
    return http.put(`/empregados/${id}`, data);
  }

  delete(id) {
    return http.delete(`/empregados/${id}`);
  }

  deleteAll() {
    return http.delete(`/empregados`);
  }

  findByNome(nome) {
    return http.get(`/empregados?nome=${nome}`);
  }

  getTecnico(empregadoId) {
    return http.get(`/tecnicos?empregadoId=${empregadoId}`);
  }

  getControlador(empregadoId) {
    return http.get(`/controladores?empregadoId=${empregadoId}`);
  }

  getTecnicoDetails(empregadoId) {
    return http.get(`/tecnicos?empregadoId=${empregadoId}`);
  }

  getControladorDetails(empregadoId) {
    return http.get(`/controladores?empregadoId=${empregadoId}`);
  }

  async getEmpregadoType(empregadoId) {
    try {
      // ver se é técnico
      const tecnicoResponse = await this.getTecnico(empregadoId);
      if (tecnicoResponse.data && tecnicoResponse.data.length > 0) {
        return "Técnico";
      }
      
      // ver se é controlador
      const controladorResponse = await this.getControlador(empregadoId);
      if (controladorResponse.data && controladorResponse.data.length > 0) {
        return "Controlador";
      }
      
      return "Empregado";
    } catch (error) {
      console.log("Erro ao verificar tipo do empregado:", error);
      return "Empregado";
    }
  }

  async getEmpregadoDetails(empregadoId) {
    try {
      const type = await this.getEmpregadoType(empregadoId);
      let details = null;
      
      if (type === "Técnico") {
        const tecnicoResponse = await this.getTecnicoDetails(empregadoId);
        details = tecnicoResponse.data[0];
      } else if (type === "Controlador") {
        const controladorResponse = await this.getControladorDetails(empregadoId);
        details = controladorResponse.data[0];
      }
      
      return { type, details };
    } catch (error) {
      console.log("Erro ao obter detalhes do empregado:", error);
      return { type: "Empregado", details: null };
    }
  }

  updateTecnico(id, data) {
    return http.put(`/tecnicos/${id}`, data);
  }

  updateControlador(id, data) {
    return http.put(`/controladores/${id}`, data);
  }

  async getAllWithTypes() {
    try {
      const response = await this.getAll();
      const empregados = response.data;
      
      const types = {};
      const details = {};
      
      for (const empregado of empregados) {
        const { type, details: empregadoDetails } = await this.getEmpregadoDetails(empregado._id);
        types[empregado._id] = type;
        if (empregadoDetails) {
          details[empregado._id] = empregadoDetails;
        }
      }
      
      return { empregados, types, details };
    } catch (error) {
      console.log("Erro ao buscar empregados com tipos:", error);
      throw error;
    }
  }

  async findByNomeWithTypes(nome) {
    try {
      const response = await this.findByNome(nome);
      const empregados = response.data;
      
      const types = {};
      const details = {};
      
      for (const empregado of empregados) {
        const { type, details: empregadoDetails } = await this.getEmpregadoDetails(empregado._id);
        types[empregado._id] = type;
        if (empregadoDetails) {
          details[empregado._id] = empregadoDetails;
        }
      }
      
      return { empregados, types, details };
    } catch (error) {
      console.log("Erro ao buscar empregados por nome com tipos:", error);
      throw error;
    }
  }
}

const empregadoDataService = new EmpregadoDataService();
export default empregadoDataService;