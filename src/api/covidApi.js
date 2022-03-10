import request from './api'

const BASE_URLS = {
  covidApi: 'https://api.covid19api.com/'
}

const URLS = {
  fetchSummaryUrl: 'summary',
  fetchCasesByStatusAndAfterDate: 'live/country'
}

export const fetchSummary = () => {
  return request.get(URLS.fetchSummaryUrl, {
    baseURL: BASE_URLS.covidApi
  })
}

export const fetchCasesByStatusAndAfterDate = (slug, date) => {
  return request.get(`${URLS.fetchCasesByStatusAndAfterDate}/${slug}/status/confirmed/date/${date}`, {
    baseURL: BASE_URLS.covidApi
  })
}
