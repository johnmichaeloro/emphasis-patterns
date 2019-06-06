const express = require('express');
const router = express.Router();
const PatternType = require('../models/patternType');
const Pattern = require('../models/pattern');

router.get('/', async (req, res, next) => {
  console.log('this is get all pattern types');
  try{
    const allTypes = await PatternType.find().populate('pattern');
    res.json({
      status: 200,
      data: allTypes
    });
  } catch(err){
    res.send(err);
  };
});

router.post('/', async (req, res) => {
  console.log(req.body, 'this is req.body');
  try{
    const createdType = await PatternType.create(req.body);
    const populatedType = await PatternType.findById(createdType).populate('pattern');
    res.json({
      status: 200,
      data: populatedType
    });
  } catch(err){
    console.log(err);
    res.send(err);
  };
});

router.put('/:id', async (req, res) => {
  console.log('inside pattern type put route');
  try {
    const updatedType = await PatternType.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('pattern'); //this might not work a populate might not work here
    res.json({
      status: 200,
      data: updatedType
    });
  } catch(err) {
    res.send(err)
  };
});

router.delete('/:id', async (req, res) => {
  console.log('inside pattern type delete route');
  try{
    const deletedType = await PatternType.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedType
    });
  } catch(err) {
    res.send(err);
  }
});

module.exports = router;
