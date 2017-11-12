import axios from 'axios'
import { getUserData, getAuthHeader } from '../lib/auth'

// auth

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

// item

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

export async function fetchItem (id) {
  let resp = await client.get(`items/${id}/`, {
    headers: getAuthHeader()
  })
  return resp.data
}

export async function addItem (data) {
  return client.post('items/', JSON.stringify(data), {
    headers: getAuthHeader()
  })
}

export async function updateItem (id, data) {
  let resp = await client.put(`items/${id}/`, JSON.stringify(data), {
    headers: getAuthHeader()
  })
  return resp.data
}

export async function deleteItem (id) {
  return client.delete(`items/${id}/`, {
    headers: getAuthHeader()
  })
}

// order

export async function fetchMyOrders () {
  let user = getUserData()
  let resp = await client.get('orders', {
    headers: getAuthHeader(),
    params: {
      item__owner: user.id
    }
  })
  return resp.data
}

export async function fetchAllOrders () {
  let resp = await client.get('orders', {
    headers: getAuthHeader()
  })
  return resp.data
}
