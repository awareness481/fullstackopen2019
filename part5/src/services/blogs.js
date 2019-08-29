import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async ({id, author, likes, title, url}) => {
  const newBlog = {
    id,
    author,
    likes: likes + 1,
    title,
    url
  }

  return await axios.put(`${baseUrl}/${id}`, newBlog);
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${baseUrl}/${id}`, config )
}

export default { getAll, create, setToken, update, remove }