import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null   //global var

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}