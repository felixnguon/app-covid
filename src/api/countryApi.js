import request from './api'

const BASE_URLS = {
  countryApi: 'https://restcountries.com/v3.1/'
}

const URLS = {
  fetchCountryUrl: 'alpha',
  fetchCountriesUrl: 'all'
}

export const fetchCountry = code => {
  const payload = {
    codes: code
  }
  const params = new URLSearchParams(payload)
  return request({
    baseURL: `${BASE_URLS.countryApi}${URLS.fetchCountryUrl + '?' + params}`,
    method: 'get'
  })
}

export const fetchCountries = () => {
  return request.get(URLS.fetchCountriesUrl, {
    baseURL: BASE_URLS.countryApi
  })
}
