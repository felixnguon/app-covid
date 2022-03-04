<template>
  <div id="app">
    <SpinnerProvider>
      <div id="nav"></div>
      <router-view />
    </SpinnerProvider>
  </div>
</template>
<script>
import SpinnerProvider from './components/common/SpinnerProvider.vue'
export default {
  components: { SpinnerProvider }
}
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
