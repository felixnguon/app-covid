<template>
  <div class="data__title text-center">
    <div class="text-1xl mt-4 mb-10">
      <PieChart :chartData="data" :chartOptions="chartOptions" :height="300" />
    </div>
  </div>
</template>

<script>
import { PieChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
export default {
  components: { PieChart },
  setup() {
    const chartOptions = {
      responsive: true,
      title: {
        display: true
      }
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
          return { backgroundColor: ['#77CEFF', '#0079AF'], ...item }
        })
      }
    }
  }
}
</script>

<style scoped></style>
