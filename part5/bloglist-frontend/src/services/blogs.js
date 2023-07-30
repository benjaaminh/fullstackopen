import axios from 'axios'
const baseUrl = '/api/blogs'

let token=null


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,setToken,create }