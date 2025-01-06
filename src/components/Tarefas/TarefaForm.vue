<template>
  <div class="tarefa-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input
          v-model="tarefaLocal.titulo"
          type="text"
          placeholder="Título"
          required
        />
        <textarea
          v-model="tarefaLocal.descricao"
          type="text"
          placeholder="Descrição"
          rows="4"
          required
        ></textarea>
        <select v-model="tarefaLocal.status">
          <option value="" disabled selected>Informe o Status</option>
          <option value="Pendente">Pendente</option>
          <option value="EmAndamento">Em Andamento</option>
          <option value="Concluido">Concluído</option>
        </select>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">
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
        status: "Pendente",
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
        descricao: "",
        status: "Pendente",
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
  max-width: 600px;
  margin: 0 auto 20px auto;
}

.form-group {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

input,
textarea,
select {
  font-family: "Inter", serif;
  font-size: 14px;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  margin: 0 auto;
}

textarea {
  resize: none;
  min-height: 60px;
}

.form-actions {
  font-weight: bold;
  max-width: 600px;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 0 auto;
}

.btn-primary {
  width: 120px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
  opacity: 0.8;
}
</style>
