import { rest } from 'msw'
import { config } from 'src/constants/config'
import { CountryCase } from 'src/mockup/countryCase'
import { summaryCasesData } from 'src/mockup/summary'
const summaryRequest = rest.get(`${config.baseUrl}summary`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(summaryCasesData.data))
})
const getByCountryRequest = rest.get(
  `${config.baseUrl}country/:code?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(CountryCase))
  }
)

const summaryRequests = [summaryRequest, getByCountryRequest]

export default summaryRequests
