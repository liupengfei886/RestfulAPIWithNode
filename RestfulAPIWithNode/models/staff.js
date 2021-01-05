const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'role'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
})

const Staff = mongoose.model('staff', staffSchema)

module.exports = Staff