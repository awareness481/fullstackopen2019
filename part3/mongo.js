const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


const url =
  `mongodb+srv://fullstack:${password}@cluster0-j6a3b.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String,
  important: Boolean,
})

const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
  name,
  date: new Date(),
  number,
  important: true,
})

phone.save().then(response => {
  console.log(`added ${name} to the database`)
  mongoose.connection.close()
});

console.log('----------------');
console.log('Listing all phone records');
Phone.find({}).then(result => {
  result.forEach(record => {
    console.log(record)
  })
  mongoose.connection.close()
})