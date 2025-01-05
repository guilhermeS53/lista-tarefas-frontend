<template>
  <div class="lista-tarefas">
    <h1>{{ msg }}</h1>

    <TarefaForm @adicionar-tarefa="adicionarTarefa" />

    <div class="tarefas">
      <div v-for="tarefa in tarefas" :key="tarefa.id" class="tarefa-item">
        <span :class="{ concluida: tarefa.concluida }">{{
          tarefa.titulo
        }}</span>
        <div class="acoes">
          <button @click="editarTarefa(tarefa)">Editar</button>
          <button @click="excluirTarefa(tarefa.id)">Excluir</button>
          <button @click="toggleConcluida(tarefa)">
            {{ tarefa.concluida ? "Desfazer" : "Concluir" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TarefaForm from "./TarefaForm.vue";

export default {
  name: "ListaTarefa",
  components: {
    TarefaForm,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      tarefas: [],
    };
  },
  methods: {
    async carregarTarefas() {
      try {
        const response = await fetch("https://localhost:7087/tarefas");
        this.tarefas = await response.json();
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    },
    async adicionarTarefa(novaTarefa) {
      try {
        const response = await fetch("https://localhost:7087/tarefas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novaTarefa),
        });
        const tarefaSalva = await response.json();
        this.tarefas.push(tarefaSalva);
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    },
    async excluirTarefa(id) {
      try {
        await fetch(`https://localhost:7087/tarefas/${id}`, {
          method: "DELETE",
        });
        this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    },
    mounted() {
      this.carregarTarefas();
    },
  },
};
</script>

<style scoped>
.lista-tarefas {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.tarefa-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.concluida {
  text-decoration: line-through;
  color: #888;
}
.acoes button {
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #42b983;
  cursor: pointer;
  background-color: white;
  color: #42b983;
}
.acoes button:hover {
  background-color: #42b983;
  color: white;
}
</style>
