import { rejectStatusErr } from './lib'

export async function fetchToken (username, passwd) {
  let resp = await fetch('/api/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: passwd
    })
  })
  if (resp.status === 400) {
    throw Error('ユーザー名またはパスワードが間違っています')
  }
  return rejectStatusErr(resp)
}
