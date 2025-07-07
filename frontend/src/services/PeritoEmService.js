import http from "../http-common";

class PeritoEmDataService {
  getAll() {
    return http.get("/perito_em");
  }

  get(id) {
    return http.get(`/perito_em/${id}`);
  }

  create(data) {
    return http.post("/perito_em", data);
  }

  update(id, data) {
    return http.put(`/perito_em/${id}`, data);
  }

  delete(id) {
    return http.delete(`/perito_em/${id}`);
  }

  deleteAll() {
    return http.delete(`/perito_em`);
  }

  async getAllWithNomes() {
    try {
      const response = await this.getAll();
      const relacoes = response.data;
      
      // Fetch técnico and modelo names
      const tecnicos = {};
      const modelos = {};

      for (const relacao of relacoes) {
        if (!tecnicos[relacao.tecnico_peritoId]) {
          try {
            const tecnicoResponse = await http.get(`/empregados/${relacao.tecnico_peritoId}`);
            tecnicos[relacao.tecnico_peritoId] = tecnicoResponse.data.nome;
          } catch (error) {
            console.log("Erro ao buscar técnico:", error);
            tecnicos[relacao.tecnico_peritoId] = "Técnico não encontrado";
          }
        }
        if (!modelos[relacao.modelo_especialidadeId]) {
          try {
            const modeloResponse = await http.get(`/modelos/${relacao.modelo_especialidadeId}`);
            modelos[relacao.modelo_especialidadeId] = modeloResponse.data.nome;
          } catch (error) {
            console.log("Erro ao buscar modelo:", error);
            modelos[relacao.modelo_especialidadeId] = "Modelo não encontrado";
          }
        }
      }

      return { relacoes, tecnicos, modelos };
    } catch (error) {
      console.log("Erro ao buscar relacionamentos com nomes:", error);
      throw error;
    }
  }
}

const peritoEmDataService = new PeritoEmDataService();
export default peritoEmDataService;