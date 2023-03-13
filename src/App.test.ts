import { screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import matchers from '@testing-library/jest-dom/matchers'
import path from './constants/path'
import { rennderWithRouter } from './utils/__test__/testUtils'
expect.extend(matchers)

beforeEach(() => {
  localStorage.clear()
})
describe('App', () => {
  it('Render Login Page', async () => {
    rennderWithRouter({
      route: path.login
    })
    await waitFor(() => {
      expect(screen.getByText(/Login/i)).toBeInTheDocument()
    })
  })
})
