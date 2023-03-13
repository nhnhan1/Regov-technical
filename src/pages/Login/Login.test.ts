import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { rennderWithRouter } from 'src/utils/__test__/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'
import { AdminAccount } from 'src/constants/utils'
describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    rennderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector(
      'form input[type="text"]'
    ) as HTMLInputElement
    passwordInput = document.querySelector(
      'form input[type="password"]'
    ) as HTMLInputElement
    submitButton = document.querySelector(
      'form button[type="submit"]'
    ) as HTMLButtonElement
  })
  it('Show Error Message When User dont type anything', async () => {
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).toBeTruthy()
      expect(screen.queryByText('Password is required')).toBeTruthy()
    })
  })
  it('Email or Password wrong', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'admin1233@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: AdminAccount.password
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(/Email or Password wrong/i)).toBeInTheDocument()
    })
  })
  it('Login Success', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: AdminAccount.email
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: AdminAccount.password
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.queryByText('Dashboard')).toBeInTheDocument()
    })
  })
})
