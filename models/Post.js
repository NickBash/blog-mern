const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Post', schema)
