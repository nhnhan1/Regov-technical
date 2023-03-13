import { rest } from 'msw'
import { config } from 'src/constants/config'
const authRequest = rest.get(`${config.baseUrl}login`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ abc: 123 }))
})

const authRequests = [authRequest]

export default authRequests
