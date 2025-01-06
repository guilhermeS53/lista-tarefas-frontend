<template>
  <div class="lista-tarefas">
    <h1>{{ msg }}</h1>

    <TarefaForm
      @adicionar-tarefa="adicionarTarefa"
      @atualizar-tarefa="atualizarTarefa"
      :tarefa-edicao="tarefaEmEdicao"
      @cancelar-edicao="cancelarEdicao"
    />

    <div class="tarefas">
      <div v-for="tarefa in tarefas" :key="tarefa.id" class="tarefa-item">
        <div class="tarefa-conteudo">
          <h3 :class="{ concluida: tarefa.status === 'Concluido' }">
            {{ tarefa.titulo }}
          </h3>
          <p>{{ tarefa.descricao }}</p>
          <span class="status-badge" :class="tarefa.status.toLowerCase()">
            {{ formatarStatus(tarefa.status) }}
          </span>
        </div>
        <div class="acoes">
          <button @click="iniciarEdicao(tarefa)" class="editar">Editar</button>
          <button @click="excluirTarefa(tarefa.id)" class="excluir">
            Excluir
          </button>
          <button @click="toggleStatus(tarefa)" class="concluir">
            {{ tarefa.status === 'Concluido' ? "Reabrir" : "Concluir" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TarefaForm from "./TarefaForm.vue";
import { tarefaService } from "@/services/tarefaService";

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
      tarefaEmEdicao: null,
    };
  },
  created() {
    this.carregarTarefas();
  },
  methods: {
    async carregarTarefas() {
      try {
        this.tarefas = await tarefaService.listar();
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    },
    async adicionarTarefa(novaTarefa) {
      try {
        const tarefaSalva = await tarefaService.criar(novaTarefa);
        this.tarefas.push(tarefaSalva);
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    },
    async excluirTarefa(id) {
      try {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
          await tarefaService.excluir(id);
          this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
        }
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    },
    async toggleStatus(tarefa) {
      try {
        const novoStatus = tarefa.status === "Concluido" ? "Pendente" : "Concluido";
        const tarefaAtualizada = { ...tarefa, status: novoStatus };

        await tarefaService.atualizar(tarefa.id, tarefaAtualizada);
        const index = this.tarefas.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) {
          this.tarefas[index] = tarefaAtualizada;
        }
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    },
    formatarStatus(status) {
      const statusMap = {
        "Concluido": "Concluído",
        "EmAndamento": "Em Andamento",
        "Pendente": "Pendente",
      };
      return statusMap[status] !== undefined ? statusMap[status] : status;
    },
    iniciarEdicao(tarefa) {
      this.tarefaEmEdicao = { ...tarefa };
    },
    cancelarEdicao() {
      this.tarefaEmEdicao = null;
    },
    async atualizarTarefa(tarefaAtualizada) {
      try {
        await tarefaService.atualizar(tarefaAtualizada.id, tarefaAtualizada);
        const index = this.tarefas.findIndex(
          (t) => t.id === tarefaAtualizada.id
        );
        if (index !== -1) {
          this.tarefas[index] = tarefaAtualizada;
        }
        this.tarefaEmEdicao = null;
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
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
  align-items: flex-start;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.tarefa-conteudo {
  flex: 1;
  text-align: left;
  margin-right: 15px;
}

.tarefa-conteudo h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.tarefa-conteudo p {
  margin: 5px 0;
  color: #667;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid #42b983;
  color: #42b983;
  font-size: 14px;
  font-weight: bold;
}

.concluida {
  text-decoration: line-through;
  color: #888;
}

.acoes {
  display: flex;
  gap: 7px;
}
.acoes button {
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #42b983;
  cursor: pointer;
  background-color: white;
}
.acoes button:hover {
  background-color: #42b983;
  color: white;
}

@media (max-width: 600px) {
  .acoes {
    margin-top: 7px;
    flex-direction: column;
  }
}
</style>
