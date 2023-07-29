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

const getAll = () => {
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,setToken }