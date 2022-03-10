const AppEnum = Object.freeze({
  TITLE: 'COVID19 - WIKI',
  DESCRIPTION: 'Countries which are most affected by Covid-19',
  SORTING: [
    {
      header: 'TOTAL CONFIRMED',
      name: 'The most total confirmed cases',
      slug: 'TotalConfirmed'
    },
    {
      header: 'TOTAL DEATHS',
      name: 'The highest number of deaths',
      slug: 'TotalDeaths'
    },
    {
      header: 'TOTAL RECOVERED',
      name: 'The most total recovered cases',
      slug: 'TotalRecovered'
    }
  ],
  TABLE: ['Country', 'TOTAL CONFIRMED', 'TOTAL DEATHS', 'TOTAL RECOVERED', 'DATE'],
  GLOBAL: {
    title: 'Global',
    data: [
      ['NewConfirmed', 'TotalConfirmed'],
      ['NewDeaths', 'TotalDeaths'],
      ['NewRecovered', 'TotalRecovered']
    ]
  }
})

export default AppEnum
