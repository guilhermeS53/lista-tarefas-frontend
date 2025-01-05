<template>
  <div class="tarefa-form">
    <form @submit.prevent="submitForm">
      <input
        v-model="tarefaLocal.titulo"
        type="text"
        placeholder="Título da Tarefa"
        required
      />
      <button type="submit">
        {{ modoEdicao ? "Atualizar" : "Adicionar" }}
      </button>
      <button v-if="modoEdicao" type="button" @click="cancelarEdicao">
        Cancelar
      </button>
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

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
