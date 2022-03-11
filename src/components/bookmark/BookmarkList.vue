<template>
  <div v-if="bookmarks.length > 0" class="absolute top-full right-0 z-50 text-lg w-full max-w-full md:max-w-lg mx-auto">
    <transition
      enter-active-class="transform transition duration-500 ease"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOpened && bookmarks.length > 0"
        class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
      >
        <template v-for="(item, index) in bookmarks" :key="index">
          <li class="px-5 py-2 transition-colors duration-300 hover:bg-gray-200" @mousedown.prevent="close">
            <div v-if="item" class="flex">
              <div class="flex-shrink-0 w-10 h-10 flex items-center">
                <img class="w-full" :src="item.flag" :alt="item.Country" />
              </div>
              <div class="ml-5">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.Country }}</p>
                <p class="text-gray-600 whitespace-no-wrap">{{ item.CountryCode }}</p>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  emits: ['on-close'],
  props: {
    isOpened: {
      type: Boolean,
      default: false
    },
    countriesData: {
      type: Array,
      default: []
    }
  },
  methods: {
    close() {
      this.$emit('on-close', false)
    }
  },
  computed: {
    bookmarks() {
      return this.$store.state.bookmark.bookmarks.length > 0
        ? this.$store.state.bookmark.bookmarks.map(item => {
            const country = this.countriesData.find(country => country.Slug === item)
            return country
          })
        : []
    }
  }
}
</script>

<style scoped>
.ease {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
