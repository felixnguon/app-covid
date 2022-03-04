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

<style lang="scss" src="./styles/index.scss"></style>
