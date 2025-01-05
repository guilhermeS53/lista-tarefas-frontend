<template>
  <div class="tarefa-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input
          v-model="tarefaLocal.titulo"
          type="text"
          placeholder="Título da Tarefa"
          required
        />
        <textarea
          v-model="tarefaLocal.descricao"
          placeholder="Descrição da Tarefa"
          rows="3"
        ></textarea>
        <select v-model="tarefaLocal.descricao">
          <option value="0">Pendente</option>
          <option value="1">Em Andamento</option>
          <option value="2">Concluído</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit">
          {{ modoEdicao ? "Atualizar" : "Adicionar" }}
        </button>
        <button v-if="modoEdicao" type="button" @click="cancelarEdicao">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TarefaForm",
  props: {
    tarefaEdicao: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tarefaLocal: {
        titulo: "",
        descricao: "",
        status: 0,
        concluida: false,
      },
    };
  },
  computed: {
    modoEdicao() {
      return !!this.tarefaEdicao;
    },
  },
  watch: {
    tarefaEdicao(novaTarefa) {
      if (novaTarefa) {
        this.tarefaLocal = { ...novaTarefa };
      }
    },
  },
  methods: {
    submitForm() {
      if (this.modoEdicao) {
        this.$emit("atualizar-tarefa", this.tarefaLocal);
      } else {
        this.$emit("adicionar-tarefa", { ...this.tarefaLocal });
      }
      this.limparFormulario();
    },
    limparFormulario() {
      this.tarefaLocal = {
        titulo: "",
        concluida: false,
      };
    },
    cancelarEdicao() {
      this.limparFormulario();
      this.$emit("cancelar-edicao");
    },
  },
};
</script>

<style scoped>
.tarefa-form {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

form {
  display: flex;
  gap: 10px;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

textarea {
  resize: none;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style>
