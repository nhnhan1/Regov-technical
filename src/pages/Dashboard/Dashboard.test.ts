import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mockAccessToken } from 'src/constants/mock'
import path from 'src/constants/path'
import { saveAccessTokenToLS } from 'src/utils/auth'
import { rennderWithRouter } from 'src/utils/__test__/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Dashboard', () => {
  beforeAll(async () => {
    saveAccessTokenToLS(mockAccessToken)
    rennderWithRouter({ route: path.dashboard })
  })
  it('Access Dashboard Page', async () => {
    await waitFor(() => {
      expect(screen.queryByText(/Dashboard/i)).toBeInTheDocument()
    })
  })
  it('Get Summary Data', async () => {
    await waitFor(() => {
      expect(screen.queryByText(/177,3K/i)).toBeInTheDocument()
    })
  })
  it('Search Country', async () => {
    const searchInput = document.querySelector(
      'form input[type="text"]'
    ) as HTMLInputElement
    fireEvent.change(searchInput, {
      target: {
        value: 'Viet Nam'
      }
    })
    fireEvent.submit(searchInput)
    await waitFor(() => {
      expect(screen.queryByText(/11526994/i)).toBeInTheDocument()
    })
  })
})
