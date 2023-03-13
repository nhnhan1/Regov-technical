export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const localStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem('access_token')
  const cleaLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(cleaLSEvent)
}
export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') || ''
