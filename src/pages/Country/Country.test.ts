import { fireEvent, screen, waitFor } from '@testing-library/react'
import { mockAccessToken } from 'src/constants/mock'
import path from 'src/constants/path'
import { saveAccessTokenToLS } from 'src/utils/auth'
import { rennderWithRouter } from 'src/utils/__test__/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'

function querySelectorIncludesText(selector: string, text: string) {
  return Array.from(document.querySelectorAll(selector)).find((el) =>
    el?.textContent?.includes(text)
  )
}

describe('Country Page', () => {
  it('Access Country Page', async () => {
    saveAccessTokenToLS(mockAccessToken)
    rennderWithRouter({ route: path.country })
    await waitFor(() => {
      expect(screen.queryByText(/There are no data/i)).toBeInTheDocument()
    })
  })
  it('Search Country on Country Page', async () => {
    saveAccessTokenToLS(mockAccessToken)
    rennderWithRouter({ route: path.country })
    const searchInput = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement

    fireEvent.change(searchInput, {
      target: {
        value: 'Viet Nam'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText(/Viet Nam/i)).toBeInTheDocument()
    })
  })
  it('View information by country', async () => {
    const searchInput = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement

    fireEvent.change(searchInput, {
      target: {
        value: 'Viet Nam'
      }
    })
    const selectCountry = querySelectorIncludesText(
      'span',
      'Viet Nam'
    ) as HTMLElement
    fireEvent.submit(selectCountry)
    rennderWithRouter({
      route: path.country + '?page=1&limit=10&code=VN&name=Viet+Nam'
    })
    await waitFor(() => {
      expect(
        screen.queryByText(/2020-Mar-01, 07:00:00 AM/i)
      ).toBeInTheDocument()
    })
  })
})
