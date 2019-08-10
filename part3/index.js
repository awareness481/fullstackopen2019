require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const util = require('util')
const mongoose = require('mongoose');

const Phone = require('./models/phone');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.use(bodyParser.json())

app.use(cors())
app.use(express.static('client/build'))



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
    "number": "23423423",
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


// For Heroku only
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/build/index.html');
// });

app.get('/api/persons', (req, res) => {
  Phone
    .find({})
    .then(phones => {
      res.send(phones)
    });
});

app.get('/info', async (req, res, next) => {
  const n = await Phone.estimatedDocumentCount()
    .then(count => count)
    .catch(err => next(err))
  console.log(n)
  const date = new Date();

  res.send(`
    Phonebook has info for ${n} people<br />
    ${date}`
  )
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  // const pre = phones.filter(e => e.id === id);
  // console.log(!!pre)
  // if (!pre[0]) res.status(404).send(`Person with id: ${req.params.id} not found!`)
  const text = `Person with id: ${id} not found!`

  Phone.findById(id)
    .then(phone => phone 
      ? res.send(phone) 
      : res.status(404).send(text))
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  Phone.findByIdAndUpdate(id, {number: number}, {new: true})
    .then(updatedPhone => res.send(updatedPhone))
    .catch(err => next(err))
    
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Phone.findByIdAndRemove(id)
    .then(result => res.status(204).end())
    .catch(err => next(err));
  res.send();
});

app.post('/api/persons/', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) return res.status(400).send('Please provide both a name and a number');

  const duplicate = phones.filter(e => e.name === name);
  console.log(!!duplicate[0])
  if (duplicate[0]) return res.status(400).send('Name already exists');

  const person = new Phone({
    name,
    number
  })
  person.save().then(product => res.send(product)).catch(err => {
    next(err)
  });
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})