const API_URL = "https://localhost:7087/tarefas";

export const tarefaService = {
  async listar() {
    const response = await fetch(`${API_URL}`);
    return response.json();
  },

  async criar(tarefa) {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
    return response.json();
  },

  async atualizar(id, tarefa) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
    return response.json();
  },

  async excluir(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
