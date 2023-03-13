import { beforeEach, describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLS, saveAccessTokenToLS } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODM3YzQ1NWZkYzVmMDM3ZTZmNmE3MCIsImVtYWlsIjoiaHV1bmhhbjA5MUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAyLTA2VDE0OjU0OjQ2LjEzMVoiLCJpYXQiOjE2NzU2OTUyODYsImV4cCI6MTY3NTY5NTI5Nn0.b8vtJ9n8a19S9BmNInwr-NMY0vVxfCMbDFHgE92ByP0'

beforeEach(() => {
  localStorage.clear()
})
describe('saveAccessTokenToLS', () => {
  it('set access_token into localstorage', () => {
    saveAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('getAccessTokenFromLS', () => {
  it('get access_token from localstorage', () => {
    saveAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})
describe('clearLS', () => {
  it('clear localstorage', () => {
    saveAccessTokenToLS(access_token)
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
  })
})
