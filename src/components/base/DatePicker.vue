<template>
  <Datepicker
    v-model="date"
    selectText="Select"
    locale="es"
    nowButtonLabel="Today"
    autoApply
    placeholder="Date"
    showNowButton
    :enableTimePicker="false"
    :dark="true"
    :clearable="false"
    :format="format"
  ></Datepicker>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

export default {
  props: ['value'],
  emits: ['on-select-date'],
  components: { Datepicker },
  data() {
    return {
      date: this.value
    }
  },
  watch: {
    date: {
      handler() {
        if (this.date) {
          this.$emit('on-select-date', this.date)
        }
      }
    }
  },
  methods: {
    format() {
      return moment(this.date).format('YYYY-MM-DD')
    }
    // select() {
    //   this.$emit('on-select-date', this.date)
    // }
  }
}
</script>
<style>
.dp__input {
  background-color: white !important;
  color: gray !important;
  border: 1px solid lightgray;
}
</style>
