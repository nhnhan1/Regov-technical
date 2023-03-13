import { rest } from 'msw'
import { config } from 'src/constants/config'
import { contries } from 'src/mockup/countries'
const getCountryRequest = rest.get(
  `${config.baseUrl}countries`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contries))
  }
)

const countryRequests = [getCountryRequest]

export default countryRequests
