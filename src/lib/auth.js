const SESSION_STORAGE_KEY = 'regisys_api_key'

export function parseToken (rawToken) {
  if (!rawToken) return null

  let token = JSON.parse(
    window.atob(
      rawToken.split('.')[1]
        .replace('-', '+')
        .replace('_', '/')
    )
  )
  token.isValid = function () {
    return Date.now() / 1000 < this.exp
  }

  return token
}

export function getToken () {
  let rawToken = sessionStorage.getItem(SESSION_STORAGE_KEY)
  return parseToken(rawToken)
}

export function getRawToken () {
  return sessionStorage.getItem(SESSION_STORAGE_KEY)
}

export function setToken (rawToken) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, rawToken)
}

export function removeToken () {
  sessionStorage.removeItem(SESSION_STORAGE_KEY)
}
