const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const nameValidator = (val) => val.length > 2;
const customNameVal = [nameValidator, 'Name must be at least 3 characters long'];

const phoneValidator = (val) => val.length > 7;
const customPhoneVal = [phoneValidator, 'Phone number must be at least 8 characters long'];

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, validate: customNameVal },
  number: { type: String, required: false, unique: true, validate: customPhoneVal },
  date: { type: Date, require: false },
});

phoneSchema.plugin(uniqueValidator);

phoneSchema.pre('findByIdAndUpdate', function(next) {
  this.options.runValidators = true;
  this.options.context = 'query';
  next();
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)