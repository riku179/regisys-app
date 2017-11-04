import _ from 'lodash'
import { getRawToken } from '../lib/auth'

export async function rejectStatusErr (resp) {
  if (!resp.ok) {
    let body = await resp.json()
    let err = new Error(_.values(body).join('<br>'))
    err.name = resp.statusText
    throw err
  }
  return resp
}

export function getAuthorizedHeader () {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + getRawToken
  }
}
