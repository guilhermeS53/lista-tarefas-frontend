<template>
  <ListaTarefa msg="Lista de Tarefas" />
</template>

<script>
import ListaTarefa from "./components/Tarefas/ListaTarefa.vue";

export default {
  name: "App",
  components: {
    ListaTarefa,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
