<template>
  <!-- Main modal -->
  <div
    id="defaultModal"
    aria-hidden="true"
    class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 shadow-md rounded-lg"
    v-if="country && isModalVisible"
  >
    <div class="relative px-4 w-full max-w-4xl h-full md:h-auto mx-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
          <img class="flag mr-5" :src="country.flags.svg" :title="country.name.common" />
          <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl text-center">{{ country.name.common }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click.prevent="close"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <ul>
            <li class="text-base leading-relaxed text-gray-700">Population: {{ country.population }}</li>
            <li class="text-base leading-relaxed text-gray-700">Capital: {{ country.capital[0] }}</li>
            <li class="text-base leading-relaxed text-gray-700">Region: {{ country.region }}</li>
            <li class="text-base leading-relaxed text-gray-700">Subregion: {{ country.subregion }}</li>
          </ul>
          <hr />
          <DatePicker @on-select-date="onSelectDate" :value="currDate" />
          <LineChart
            v-if="chartData.length > 0 && chartData[0].data.length > 0"
            :labels="chartLabels"
            :datasets="chartData"
          />
          <div v-else>
            <Heading heading="h2" class="text-center text-xl md:text-3xl mb-10">Select a date to view data</Heading>
          </div>
        </div>
        <div class="p-6 space-y-6"></div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click.prevent="close"
          >
            Close
          </button>
          <button
            type="button"
            :class="[
              `text-blue-700 text-yellow-300 hover:text-lime-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 ml-auto`,
              `${isAddable ? ' text-yellow-300' : ' text-zinc-600 opacity-75 '}`
            ]"
            @click.prevent="isAddable ? addBookmark(country.Slug) : removeBookmark(country.Slug)"
          >
            <font-awesome-icon :icon="['fas', 'star']" style="color: inherit" class="h-10" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fetchCasesByStatusAndAfterDate } from '../../api/covidApi'
import DatePicker from '../base/DatePicker.vue'
import Heading from '../base/Heading.vue'
import LineChart from './charts/LineChart.vue'
import { useSpinner } from '../common/SpinnerProvider.vue'

export default {
  emits: ['on-close', 'on-add-bookmark', 'on-remove-bookmark'],
  components: { DatePicker, Heading, LineChart },
  data() {
    return {
      currDate: this.getDateXDaysAgo(5),
      chartLabels: [],
      chartData: []
    }
  },
  setup() {
    const { setSpinnerOn, setSpinnerOff } = useSpinner()

    return {
      setSpinnerOn,
      setSpinnerOff
    }
  },
  props: {
    modal: {
      type: Object,
      default: {
        isVisible: false
      }
    },
    summary: {
      type: Array,
      default: []
    },
    bookmarks: {
      type: Array,
      default: []
    }
  },
  methods: {
    getCasesByStatusAndAfterDate(date) {
      fetchCasesByStatusAndAfterDate(this.modal.selected.Slug, date).then(data => {
        const getUnique = [...new Set(data.map(item => item.Date))]
        const chartData = getUnique.map(item => {
          const findData = data
            .slice()
            .reverse()
            .find(object => object.Date === item)
          return findData
        })
        this.chartLabels = chartData.map(item => moment(item.Date).format('MMMM Do YYYY'))
        const array = ['Confirmed', 'Deaths', 'Recovered']
        this.chartData = []
        array.forEach(item => {
          const data = chartData.map(obj => obj[item])
          this.chartData.push({ label: item, data })
        })
        this.setSpinnerOff()
      })
    },
    close() {
      this.$emit('on-close', false)
    },
    onSelectDate(selectDate) {
      this.setSpinnerOn()
      this.currDate = moment(selectDate).format()
      this.getCasesByStatusAndAfterDate(moment(selectDate).format())
    },
    addBookmark(slug) {
      this.$emit('on-add-bookmark', slug)
    },
    removeBookmark(slug) {
      this.$emit('on-remove-bookmark', slug)
    },
    getDateXDaysAgo(numOfDays, date = new Date()) {
      const daysAgo = new Date(date.getTime())
      daysAgo.setDate(date.getDate() - numOfDays)
      return daysAgo
    }
  },
  computed: {
    isModalVisible() {
      return this.modal.isVisible
    },
    country() {
      return this.modal.selected
    },
    isAddable() {
      return this.bookmarks.length === 0 || !this.bookmarks.includes(this.country.Slug)
    }
  },
  watch: {
    isModalVisible: {
      handler(value) {
        if (value) this.onSelectDate(this.getDateXDaysAgo(5))
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.flag {
  max-width: 60px;
}
</style>
