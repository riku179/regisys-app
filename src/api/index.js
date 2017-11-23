import axios from 'axios'
import { getUserData } from '../lib/auth'

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

let client = axios.create({
  baseURL: '/api/',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// item

export async function fetchMyItems () {
  let user = getUserData()
  let resp = await client.get('items/', {
    params: {
      owner: user.id
    }
  })
  return resp.data
}

export async function fetchAllItems () {
  let resp = await client.get('items/')
  return resp.data
}

export async function fetchItem (id) {
  let resp = await client.get(`items/${id}/`)
  return resp.data
}

export async function addItem (data) {
  return client.post('items/', JSON.stringify(data))
}

export async function updateItem (id, data) {
  let resp = await client.put(`items/${id}/`, JSON.stringify(data))
  return resp.data
}

export async function deleteItem (id) {
  return client.delete(`items/${id}/`)
}

// order

export async function fetchMyOrders () {
  let user = getUserData()
  let resp = await client.get('orders/', {
    params: {
      item__owner: user.id
    }
  })
  return resp.data
}

export async function fetchAllOrders () {
  let resp = await client.get('orders/')
  return resp.data
}

export async function fetchOrdersAggregation (from, to) {
  let resp = await client.get('orders/aggregate/', {
    params: {
      from: dateTimeToStr(from),
      to: dateTimeToStr(to)
    }
  })
  return resp.data
}

export async function pushOrder (orderData) {
  let resp = await client.post('orders/', JSON.stringify(orderData))
  return resp.data
}

// helper func

function dateTimeToStr (dt) {
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
}
