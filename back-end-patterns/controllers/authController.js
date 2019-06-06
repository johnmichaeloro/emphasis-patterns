const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  console.log(req.body, 'this is the user session upon login');
  try{
    User.findOne({username: req.body.username}, (err, foundUser) => {
      if(err){
        console.log(err, 'this was the login error');
      } else if (!foundUser) {
        req.session.loginAttempt = false;
        console.log('failed to login');
        res.send('login failed');
      } else {
        console.log('this is the foundUser', foundUser);
        console.log('Comparing bcrypt password hash.');
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          console.log('passwords match');
          res.json({
            status: 200,
            data: 'login successful'
          });
        } else{
          console.log(err);
        }
      }
    });
  } catch(err) {
    console.log(err);
  }
});

router.get('/logout', async (req, res) => {
  req.session.logged = false;
  req.session.destroy();
  console.log('session destroyed, user logged out');
  res.send({
    status: 201,
    data: 'user logged out'
  })
});

router.post('/register', async (req, res) => {
  console.log(req.body, 'this is the user session upon registration');
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  };
  try{
    const user = await User.create(newUser);
    req.session.logged = true;
    req.session.username = req.body.username;
    res.json({
      status: 200,
      data: 'registration successful'
    });
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
