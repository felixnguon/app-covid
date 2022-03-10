<template>
  <div class="md:w-1/3 rounded-lg shadow-sm mb-4 px-2">
    <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
      <div class="px-3 pt-8 pb-10 text-center relative z-10">
        <div>
          <Heading heading="h4" class="text-sm uppercase text-gray-500 leading-tight">{{ slugs[0] }}</Heading>
          <Heading heading="h3" class="text-3xl text-gray-700 font-semibold leading-tight my-3">{{
            data[slugs[0]]
          }}</Heading>
        </div>

        <p class="text-xs text-green-500 leading-tight">▲ {{ percentage }} %</p>
      </div>
      <div class="absolute bottom-0 inset-x-0">
        <canvas id="chart1" height="70"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../base/Heading.vue'

export default {
  components: { Heading },
  data() {
    return {}
  },
  emits: ['on-selected'],
  props: {
    slugs: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    setOption(option) {
      // this.selectedOption = option
      // this.isOpened = false
      // this.$emit('on-selected', this.selectedOption)
    }
  },
  computed: {
    percentage() {
      return this.data[this.slugs[0]] > 0
        ? parseFloat((this.data[this.slugs[0]] * 100) / this.data[this.slugs[1]]).toFixed(2)
        : 0
    }
  }
}
</script>

<style scoped>
.ease {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
