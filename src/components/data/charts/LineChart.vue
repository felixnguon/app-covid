<template>
  <div v-if="data.datasets.length > 0 && data.datasets[0].data.length > 0" class="data__title text-center">
    <div class="text-1xl mt-4 mb-10">
      <LineChart :chartData="data" :chartOptions="chartOptions" :height="350" />
    </div>
  </div>
</template>

<script>
import Heading from '../../base/Heading.vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
export default {
  components: { Heading, LineChart },
  setup() {
    const chartOptions = {
      responsive: true
    }

    return { chartOptions }
  },

  props: {
    labels: {
      type: Array
    },
    datasets: {
      type: Array
    }
  },
  computed: {
    data() {
      return {
        labels: [...this.labels],
        datasets: this.datasets.map(item => {
          return { backgroundColor: ['#77CEFF', '#fe6283', '#fef5ec'], ...item }
        })
      }
    }
  }
}
</script>

<style scoped></style>
