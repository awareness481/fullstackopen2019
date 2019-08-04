const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

let phones = [
  {
    "name": "Arto Hellas",
    "number": "040-4574574",
    "id": 1
  },
  {
    "name": "Ade Lovelace",
    "number": "39-44-5742474",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "phone": "23423423",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (req, res) => {
  res.send(phones);
});

app.get('/info', (req, res) => {
  const n = phones.length;
  const date = new Date();

  res.send(`
    Phonebook has info for ${n} people<br />
    ${date}`
  )
});

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const pre = phones.filter(e => e.id === id);
  console.log(!!pre)
  if (!pre[0]) res.status(404).send(`Person with id: ${req.params.id} not found!`)

  res.send(pre[0]);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  phones = phones.filter(e => e.id !== id);
  res.send();
});

app.post('/api/persons/', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) return res.status(400).send('Please provide both a name and a number');

  const duplicate = phones.filter(e => e.name === name);
  console.log(!!duplicate[0])
  if (duplicate[0]) return res.status(400).send('Name already exists');

  const id = Math.floor(Math.random() * 100000);

  phones.push({
    name,
    number,
    id
  });

  res.send();
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})