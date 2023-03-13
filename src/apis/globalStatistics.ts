import { CountryCase, SummaryCase } from 'src/types/cases.type'
import http from 'src/utils/http'

const URL_SUMMARY = 'summary'
const URL_GEY_BY_COUNTRY = '/country'

const globalStatisticsApi = {
  getSummary() {
    return http.get<SummaryCase>(URL_SUMMARY)
  },
  getByCountry(params: string) {
    return http.get<CountryCase[]>(`${URL_GEY_BY_COUNTRY}/${params}`, {
      params: {
        from: '2020-03-01T00:00:00Z',
        to: '2020-04-01T00:00:00Z'
      }
    })
  }
}
export default globalStatisticsApi
