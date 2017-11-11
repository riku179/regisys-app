import axios from 'axios'
import { getUserData, getAuthHeader } from '../lib/auth'

export async function fetchToken (username, passwd) {
  let res = await axios.post('/api/auth/token',
    JSON.stringify({
      username: username,
      password: passwd
    }), {
      headers: {'Content-Type': 'application/json'}
    }
  )
  return res.data
}

let client = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function fetchMyItems () {
  let user = getUserData()
  let resp = await client.get('items', {
    headers: getAuthHeader(),
    params: {
      owner: user.id
    }
  })
  return resp.data
}

export async function fetchAllItems () {
  let resp = await client.get('items', {
    headers: getAuthHeader()
  })
  return resp.data
}

export async function deleteItem (id) {
  return client.delete('items/' + id)
}
