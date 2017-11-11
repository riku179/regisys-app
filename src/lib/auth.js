const SESSION_STORAGE_JWT_KEY = 'regisys_api_key'
const SESSION_STORAGE_USER_KEY = 'regisys_user_key'

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
  let rawToken = sessionStorage.getItem(SESSION_STORAGE_JWT_KEY)
  return parseToken(rawToken)
}

export function getAuthHeader () {
  return { Authorization: 'JWT ' + getRawToken() }
}

function getRawToken () {
  return sessionStorage.getItem(SESSION_STORAGE_JWT_KEY)
}

export function getUserData () {
  return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER_KEY))
}

export function setAuthData ({token, user}) {
  sessionStorage.setItem(SESSION_STORAGE_JWT_KEY, token)
  sessionStorage.setItem(SESSION_STORAGE_USER_KEY, JSON.stringify(user))
}

export function removeAuthData () {
  sessionStorage.removeItem(SESSION_STORAGE_JWT_KEY)
  sessionStorage.removeItem(SESSION_STORAGE_USER_KEY)
}
