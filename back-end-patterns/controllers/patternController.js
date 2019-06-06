const express = require('express');
const router = express.Router();
const Pattern = require('../models/pattern');
const PatternType = require('../models/patternType');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  console.log('this is get all patterns');
  try{
    const allPatterns = await Pattern.find().populate('patternType').populate('user');
    res.json({
      status: 200,
      data: allPatterns
    });
  } catch(err) {
    res.send(err);
  };
});

router.post('/', async (req, res) => {
  console.log(req.body, 'this is req.body');
  try{
    //I NEED TO QUERY FOR THE PATTERN TYPE PATTERNTYPE.FIND WHERE THE TYPE NAME MATCHES THE ONE FROM REQ.BODY THEN I GRAB
    const createdPattern = await Pattern.create(req.body);
    const populatedPattern = await Pattern.findById(createdPattern).populate('patternType').populate('user');
    console.log("this is the created pattern " + createdPattern);
    res.json({
      status: 200,
      data: createdPattern
    });
  } catch(err) {
    res.send(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const foundPattern = await Pattern.findById(req.params.id).populate('patternType').populate('user');
    res.json({
      status: 200,
      data: foundPattern
    });
  } catch(err) {
    res.send(err);
  }
});

router.put('/:id', async (req, res) => {
  console.log('inside put route');
  try{
    const updatedPattern = await Pattern.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('patternType').populate('user');
    res.json({
      status: 200,
      data: updatedPattern
    });
  } catch(err) {
    res.send(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deletedPattern = await Pattern.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedPattern
    });
  } catch(err) {
    res.send(err);
  }
});

module.exports = router;
