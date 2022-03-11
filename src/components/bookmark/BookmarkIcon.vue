<template>
  <div class="relative">
    <font-awesome-icon
      :icon="['fas', 'star']"
      style="color: rgb(241 192 39)"
      class="h-10 md:h-14"
      @click="isOpened = !isOpened"
      @blur="isOpened = false"
    />
    <span
      class="flex items-center justify-center text-sm absolute inline-block top-2 right-0 w-5 h-5 rounded-full bg-red-500 text-white"
      >{{ bookmarks.length }}</span
    >
  </div>
  <BookmarkList :isOpened="isOpened" :countriesData="data" @onClose="onCloseList" />
</template>

<script>
import BookmarkList from './BookmarkList.vue'
export default {
  components: { BookmarkList },
  data() {
    return {
      isOpened: false
    }
  },
  props: {
    bookmarks: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    onCloseList() {
      this.isOpened = false
    }
  }
}
</script>
<style module>
.bookmark__icon {
  position: relative;
}
</style>
