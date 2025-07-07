import http from "../http-common";

class TesteDataService{
  getAll() {
    return http.get("/testes");
  }

  get(id) {
    return http.get(`/testes/${id}`);
  }

  create(data) {
    return http.post("/testes", data);
  }

  update(id, data) {
    return http.put(`/testes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/testes/${id}`);
  }

  deleteAll() {
    return http.delete(`/testes`);
  }

  findByNumAnac(num) {
     return http.get(`/testes?num_anac=${num}`);
  }

  async getAllWithTecnicoNomes() {
    try {
      const response = await this.getAll();
      const testes = response.data;
      
      // Fetch técnico names for each teste
      const tecnicoNomes = {};
      for (const teste of testes) {
        try {
          // Get técnico details to find the empregado ID
          const tecnicoResponse = await http.get(`/tecnicos?empregadoId=${teste.supervisor_tecnicoId}`);
          if (tecnicoResponse.data && tecnicoResponse.data.length > 0) {
            const tecnico = tecnicoResponse.data[0];
            
            // Get empregado name using the empregadoId from técnico
            const empregadoResponse = await http.get(`/empregados/${tecnico.empregadoId}`);
            tecnicoNomes[teste.supervisor_tecnicoId] = empregadoResponse.data.nome;
          } else {
            tecnicoNomes[teste.supervisor_tecnicoId] = "Técnico não encontrado";
          }
        } catch (error) {
          console.log("Erro ao carregar técnico:", error);
          tecnicoNomes[teste.supervisor_tecnicoId] = "Técnico não encontrado";
        }
      }
      
      return { testes, tecnicoNomes };
    } catch (error) {
      console.log("Erro ao buscar testes com nomes de técnico:", error);
      throw error;
    }
  }

  async findByNumAnacWithNomes(num) {
    try {
      const response = await this.findByNumAnac(num);
      const testes = response.data;
      
      // Fetch técnico names for filtered testes
      const tecnicoNomes = {};
      for (const teste of testes) {
        try {
          const tecnicoResponse = await http.get(`/tecnicos?empregadoId=${teste.supervisor_tecnicoId}`);
          if (tecnicoResponse.data && tecnicoResponse.data.length > 0) {
            const tecnico = tecnicoResponse.data[0];
            const empregadoResponse = await http.get(`/empregados/${tecnico.empregadoId}`);
            tecnicoNomes[teste.supervisor_tecnicoId] = empregadoResponse.data.nome;
          } else {
            tecnicoNomes[teste.supervisor_tecnicoId] = "Técnico não encontrado";
          }
        } catch (error) {
          console.log("Erro ao carregar técnico:", error);
          tecnicoNomes[teste.supervisor_tecnicoId] = "Técnico não encontrado";
        }
      }
      
      return { testes, tecnicoNomes };
    } catch (error) {
      console.log("Erro ao buscar testes por número ANAC com nomes:", error);
      throw error;
    }
  }
}

const testeDataService = new TesteDataService();
export default testeDataService;