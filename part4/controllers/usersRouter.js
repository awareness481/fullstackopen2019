const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User');

usersRouter.post('/', async (request, response, next) => {
  const { name, username, password } = request.body;

  if (password.length < 3) {
    response.status(401).send('Use a password with more than 3 characters');
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });
    
    const savedUser = await user.save();
    response.json(savedUser)
  } catch(exception) {
    next(exception);
  }
})

module.exports = usersRouter;