import { CountriesInfo } from 'src/types/countries.type'
import http from 'src/utils/http'
const URL_GET_COUNTRIES = '/countries'

const countriesApi = {
  getCountries() {
    return http.get<CountriesInfo[]>(URL_GET_COUNTRIES)
  }
}
export default countriesApi
