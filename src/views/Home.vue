<template>
  <div class="home px-5 md:px-2 py-5">
    <header class="flex items-center justify-center relative">
      <Heading heading="h1" elClass="text-3xl md:text-5xl text-center my-5 font-bold grow">{{ AppEnum.TITLE }}</Heading>
      <BookmarkIcon :bookmarks="bookmarks" :data="countriesData" />
    </header>
    <div>
      <Heading heading="h2" elClass="text-xl md:text-3xl text-center font-light">{{ AppEnum.DESCRIPTION }}</Heading>
      <DataTitle :data-date="date" />
      <Section>
        <Heading
          heading="h2"
          elClass="text-xl md:text-3xl text-center font-semibold leading-tight md:mr-5 mb-2 md:mb-4"
          >{{ AppEnum.GLOBAL.title }}</Heading
        >
        <div class="md:flex items-center">
          <template v-for="(slugs, index) in AppEnum.GLOBAL.data" :key="index">
            <DataStatistic :slugs="slugs" :data="stats" />
          </template>
        </div>
      </Section>
      <Section>
        <DataTable
          :headers="AppEnum.TABLE"
          :data="countriesData"
          :dataDropdown="AppEnum.SORTING"
          :sort-by="currentState.slug"
          :data-countries="countries"
          @onSelectedModal="onSelectedModal"
        />
      </Section>
      <DataModal
        :modal="modal"
        :bookmarks="bookmarks"
        @onClose="onCloseModal"
        @onAddBookmark="onAddBookmark"
        @onRemoveBookmark="onRemoveBookmark"
      />
    </div>
  </div>
</template>

<script>
import { useSpinner } from '../components/common/SpinnerProvider.vue'
import { fetchSummary } from '../api/covidApi'
import { fetchCountries } from '../api/countryApi'
import { ref, onMounted } from 'vue'
import AppEnum from '../enums/AppEnum'
import Heading from '../components/base/Heading.vue'
import Section from '../components/base/Section.vue'
import DataTitle from '../components/data/DataTitle.vue'
import DataTable from '../components/data/DataTable.vue'
import DataModal from '../components/data/DataModal.vue'
import DataStatistic from '../components/data/DataStatistic.vue'
import BookmarkIcon from '../components/bookmark/BookmarkIcon.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
  name: 'Home',
  components: { Heading, BookmarkIcon, Section, DataTitle, DataTable, DataModal, DataStatistic },
  data() {
    return {
      currentState: {},
      modal: {
        isVisible: false,
        selected: {}
      }
    }
  },
  setup() {
    const date = ref('')
    const countriesData = ref([])
    const stats = ref({})
    const countries = ref([])

    const { setSpinnerOn, setSpinnerOff } = useSpinner()

    const fetchCovidSummaryData = () => {
      return new Promise(function (resolve, reject) {
        fetchSummary().then(data => {
          date.value = data.Date
          stats.value = data.Global
          countriesData.value = data.Countries
          resolve()
        })
      })
    }
    const fetchCountriesInfo = () => {
      return new Promise(function (resolve, reject) {
        fetchCountries().then(data => {
          countries.value = data
          resolve()
        })
      })
    }
    const mapFlagAndData = () => {
      countriesData.value = countriesData.value.map(item => {
        const country = countries.value.find(country => country.cca2 === item.CountryCode)
        return { flag: country ? country.flags.svg : '', ...item }
      })
    }
    onMounted(() => {
      setSpinnerOn()
      Promise.all([fetchCovidSummaryData(), fetchCountriesInfo()]).then(() => {
        mapFlagAndData()
        setSpinnerOff()
      })
    })
    return {
      date,
      countriesData,
      stats,
      countries,
      fetchCovidSummaryData
    }
  },
  computed: {
    AppEnum() {
      return AppEnum
    },
    bookmarks() {
      return this.$store.state.bookmark.bookmarks
    }
  },
  created() {
    this.$store.commit('bookmark/FETCH_BOOKMARK')
  },
  methods: {
    onToggleModal() {
      this.modal.isVisible = !this.modal.isVisible
    },
    onCloseModal() {
      this.modal.isVisible = false
    },
    onSelectedModal(country) {
      const countryInfo = this.countries.find(item => item.cca2 === country.CountryCode)
      if (countryInfo) {
        this.modal.isVisible = true
      }

      this.modal.selected = { ...countryInfo, ...country }
    },
    onAddBookmark(slug) {
      this.$store.commit('bookmark/SET_BOOKMARK', slug)
      const countryInfo = this.countriesData.find(item => item.Slug === slug)
      toast.success(`${countryInfo.Country} bookmarked!`, {
        timeout: 1000
      })
    },
    onRemoveBookmark(slug) {
      this.$store.commit('bookmark/REMOVE_BOOKMARK', slug)
      const countryInfo = this.countriesData.find(item => item.Slug === slug)
      toast.info(`${countryInfo.Country} unbookmarked!`, {
        timeout: 1000
      })
    }
  }
}
</script>
