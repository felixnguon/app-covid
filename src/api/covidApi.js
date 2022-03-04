import request from './api'

const URLS = {
  fetchSummaryUrl: 'summary'
}

export const fetchSummary = () => {
  return request.get(URLS.fetchSummaryUrl, {
    baseURL: 'https://api.covid19api.com/'
  })
}
