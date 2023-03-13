import matchers from '@testing-library/jest-dom/matchers'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'
import authRequests from './src/msw/auth.msw'
import summaryRequests from './src/msw/summary.msw'
import countryRequests from './src/msw/country.msw'
expect.extend(matchers)
global.ResizeObserver = require('resize-observer-polyfill')
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})
const server = setupServer(
  ...authRequests,
  ...summaryRequests,
  ...countryRequests
)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
