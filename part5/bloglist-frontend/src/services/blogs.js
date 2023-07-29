import axios from 'axios'
const baseUrl = '/api/blogs'

let token=null
let config

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config= {
    headers: {Authorization :token}
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl,config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,setToken }