<template>
  <div class="data__title text-center">
    <div class="text-1xl mt-4 mb-10">
      {{ timestamp }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { computed } from 'vue'
export default {
  name: 'DataTitle',
  props: {
    text: {
      type: String
    },
    dataDate: {
      type: String
    }
  },
  setup(dataDate) {
    const timestamp = computed(() => moment(dataDate).format('MMMM Do YYYY, h:mm:ss a'))
    return {
      dataDate,
      timestamp
    }
  }
}
</script>

<style scoped></style>
