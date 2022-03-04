import request from './api'

const BASE_URLS = {
  covidApi: 'https://api.covid19api.com/'
}

const URLS = {
  fetchSummaryUrl: 'summary'
}

export const fetchSummary = () => {
  return request.get(URLS.fetchSummaryUrl, {
    baseURL: BASE_URLS.covidApi
  })
}
