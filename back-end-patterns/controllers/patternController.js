const express = require('express');
const router = express.Router();
const Pattern = require('../models/pattern');
const PatternType = require('../models/patternType');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  console.log('this is get all patterns');
  try{
    const allPatterns = await Pattern.find().populate('patternType').populate('user');
    console.log(allPatterns, 'this is all of the patterns');
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
    const createdPattern = await Pattern.create(req.body);
    const populatedPattern = await Pattern.findById(createdPattern).populate('patternType').populate('user');
    const pushedType = await PatternType.findById(req.body.patternType);
    pushedType.patterns.push(populatedPattern.id);
    await pushedType.save();
    const populatedType = await pushedType.populate('pattern');
    res.json({
      status: 200,
      data: populatedPattern
    });
  } catch(err) {
    console.log(err);
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
    const updatedType = await PatternType.findOne({'patterns': req.params.id});
    for(let i = 0; i < updatedType.patterns.length; i++){
      console.log(0, req.params.id, updatedType.patterns[i]);
      if(req.params.id === (updatedType.patterns[i] + "")){
        console.log(1, updatedType.patterns.length);
        const currentPatternIndex = updatedType.patterns[i];
        updatedType.patterns = updatedType.patterns.splice(currentPatternIndex, 1);
        console.log(2, updatedType.patterns.length);
        await updatedType.save();
      }
    }
    res.json({
      status: 200,
      data: deletedPattern
    });
  } catch(err) {
    res.send(err);
  }
});

module.exports = router;
