<template>
  <div v-if="dataOptions.length > 0" class="relative text-lg max-w-full md:max-w-lg mx-auto">
    <button
      class="flex items-center justify-between px-5 py-2 bg-white w-full border border-gray-300 rounded-lg"
      @click="isOpened = !isOpened"
      @blur="isOpened = false"
    >
      <span class="mr-2">{{ selectedOption.name }}</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="isOpened ? 'rotate-180' : 'rotate-0'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul v-show="isOpened" class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden">
        <li
          v-for="(option, index) in dataOptions"
          :key="index"
          class="px-5 py-2 transition-colors duration-300 hover:bg-gray-200"
          @mousedown.prevent="setOption(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false,
      selectedOption: this.dataOptions[0]
    }
  },
  emits: ['on-selected'],
  props: {
    dataOptions: {
      type: Array,
      default: []
    }
  },
  methods: {
    setOption(option) {
      this.selectedOption = option
      this.isOpened = false
      this.$emit('on-selected', this.selectedOption)
    }
  }
}
</script>

<style scoped>
.ease {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
