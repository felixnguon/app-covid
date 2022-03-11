<template>
  <div class="">
    <div class="md:flex items-center">
      <Heading
        heading="h2"
        class="text-xl md:text-xl text-center md:text-left font-semibold leading-tight md:mr-5 mb-2 md:mb-0"
        >Countries</Heading
      >
      <DataDropdown
        class="ml-0"
        v-if="dataDropdown.length > 0"
        :data-options="dataDropdown"
        @on-selected="onDropdownSelected"
      />
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full overflow-hidden shadow-md rounded-lg">
        <table class="min-w-full leading-normal">
          <thead v-if="headers.length > 0" class="flex w-full">
            <tr class="flex w-full">
              <template v-for="(th, index) in headers" :key="index">
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase"
                >
                  {{ th }}
                </th>
              </template>
              <th class="px-5 py-3 border-b-2 border-gray-200"></th>
            </tr>
          </thead>
          <tbody class="flex flex-col items-center justify-between overflow-y-scroll w-full" style="height: 50vh">
            <tr v-for="(item, index) in dataSorted" :key="index" class="flex w-full">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10 flex items-center">
                    <img class="w-full" :src="item.flag" alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">{{ item.Country }}</p>
                    <p class="text-gray-600 whitespace-no-wrap">{{ item.CountryCode }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.TotalConfirmed }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.TotalDeaths }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.TotalRecovered }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ formatDate(item.Date) }}
                </p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button
                  type="button"
                  class="inline-block text-gray-500 hover:text-gray-700"
                  @click="selectCountry(item)"
                >
                  <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DataDropdown from '../data/DataDropdown.vue'
import Heading from '../base/Heading.vue'

export default {
  emits: ['on-selected-modal'],
  components: { Heading, DataDropdown },
  data() {
    return {
      sortByValue: this.dataDropdown[0].slug
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    dataDropdown: {
      type: Array,
      default: []
    },
    sortBy: {
      type: String,
      default: ''
    },
    dataCountries: {
      type: Array,
      default: []
    },
    headers: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectCountry(country) {
      this.$emit('on-selected-modal', country)
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
    onDropdownSelected({ name, slug }) {
      this.sortByValue = slug
    },
    sorting(array, sortBy) {
      return sortBy
        ? array.sort(function (a, b) {
            return b[sortBy] - a[sortBy]
          })
        : array
    }
  },
  computed: {
    dataSorted() {
      return this.sorting(this.data, this.sortByValue)
    }
  }
}
</script>

<style lang="scss" module>
table {
  thead {
    max-width: calc(100% - 15px);
  }
  thead,
  tbody {
    tr {
      th,
      td {
        @apply w-40 md:w-60;
        &:nth-child(1) {
          @apply w-1/4 md:w-1/3;
          flex-grow: 1;
        }
        &:last-child() {
          @apply w-36;
        }
      }
      th {
        background-color: rgb(194 194 194 / 26%);
      }
    }
  }
}
</style>
