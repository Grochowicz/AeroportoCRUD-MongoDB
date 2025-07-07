import http from "../http-common";

class AviaoDataService {
  getAll() {
    return http.get("/avioes");
  }

  get(id) {
    return http.get(`/avioes/${id}`);
  }

  create(data) {
    return http.post("/avioes", data);
  }

  update(id, data) {
    return http.put(`/avioes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/avioes/${id}`);
  }

  deleteAll() {
    return http.delete(`/avioes`);
  }

  findByModelo(modelo) {
    return http.get(`/avioes?modeloId=${modelo}`);
  }

  async getAllWithModeloNomes() {
    try {
      const response = await this.getAll();
      const avioes = response.data;
      
      // Fetch modelo names for each avião
      const modeloNomes = {};
      for (const aviao of avioes) {
        try {
          const modeloResponse = await http.get(`/modelos/${aviao.modeloId}`);
          modeloNomes[aviao.modeloId] = modeloResponse.data.nome;
        } catch (error) {
          console.log("Erro ao carregar modelo:", error);
          modeloNomes[aviao.modeloId] = "Modelo não encontrado";
        }
      }
      
      return { avioes, modeloNomes };
    } catch (error) {
      console.log("Erro ao buscar aviões com nomes de modelo:", error);
      throw error;
    }
  }

  async findByModeloWithNomes(modelo) {
    try {
      const response = await this.findByModelo(modelo);
      const avioes = response.data;
      
      // Fetch modelo names for filtered aviões
      const modeloNomes = {};
      for (const aviao of avioes) {
        try {
          const modeloResponse = await http.get(`/modelos/${aviao.modeloId}`);
          modeloNomes[aviao.modeloId] = modeloResponse.data.nome;
        } catch (error) {
          console.log("Erro ao carregar modelo:", error);
          modeloNomes[aviao.modeloId] = "Modelo não encontrado";
        }
      }
      
      return { avioes, modeloNomes };
    } catch (error) {
      console.log("Erro ao buscar aviões por modelo com nomes:", error);
      throw error;
    }
  }
}

const aviaoDataService = new AviaoDataService();
export default aviaoDataService;