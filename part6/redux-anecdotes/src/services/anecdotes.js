import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response;
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`);
  console.log(anecdote.data)
   anecdote.data.votes++;
   console.log(anecdote.data)
  const response = await axios.put(`${baseUrl}/${id}`, anecdote.data);
  return response;
}

export default { getAll, create, vote }