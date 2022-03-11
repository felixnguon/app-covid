<template>
  <main>
    <SpinnerProvider>
      <div id="nav"></div>
      <div id="content"><router-view /></div>
    </SpinnerProvider>
  </main>
</template>
<script>
import SpinnerProvider from './components/common/SpinnerProvider.vue'
export default {
  components: { SpinnerProvider }
}
</script>

<style lang="scss" src="./styles/index.scss"></style>
