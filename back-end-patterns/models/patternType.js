const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pattern = require('./pattern');

const TypeSchema = new Schema({
  patterns: {
    type: [Schema.Types.ObjectId],
    ref: 'Pattern'
  },
  patternType: {type: String, required: true, unique: true},
  description: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('PatternType', TypeSchema);
