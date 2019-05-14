<template>
  <div id="app">
    <entire-board />
  </div>
</template>

<script>
import Board from './components/EntireBoard.vue'
export default {
  name: 'App',
  components: {
    'entire-board': Board,
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
