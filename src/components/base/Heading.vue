<template>
  <component :class="elClass" :is="heading" v-bind="$attrs">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script>
export default {
  name: 'BaseHeading',
  inheritAttrs: false,
  props: {
    heading: {
      type: String,
      default: 'h1'
    },
    text: {
      type: String,
      default: ''
    },
    elClass: {
      type: String,
      default: ''
    }
  }
}
</script>
<style module></style>
