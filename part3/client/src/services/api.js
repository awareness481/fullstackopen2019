import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl)

};

const create = newObject => {
  return axios.post(baseUrl, newObject)
};

const update = async (name, newObject) => {
 const id = await getAll().then(res => res.data).then(e => e.filter(c => c.name === name)[0].id);
 axios.put(`${baseUrl}/${id}`, newObject)
};

const remove = async (name) => {
  const id = await getAll().then(res => res.data).then(e => e.filter(c => c.name === name)[0].id);
  axios.delete(`${baseUrl}/${id}`)
};

export default { 
  getAll,
  create, 
  update,
  remove
};

