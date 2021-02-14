const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/getcurrent',auth, async (req, res) => {
  console.log("TUT",req.user._id);
  const currentUser = await User.find({_id:req.user._id}).select('-password');
  console.log("Bbb", currentUser);
  res.send(currentUser);
});

router.get('/getallusers',auth, async (req, res) => {
  // console.log("TUT",req.user._id);
  const users = await User.find({_id:{$ne:req.user._id}}).select();
  let usersNoPassword=[];
  users.forEach(user=>{
    user.password="";
    usersNoPassword.push(user);
  });
  res.status(200).json({"users":usersNoPassword});
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'biz', 'cards']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router; 