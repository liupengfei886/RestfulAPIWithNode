const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  permissions: [{
    type: Schema.Types.ObjectId, 
    ref: 'permission'
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String
  }
})

const Role = mongoose.model('role', roleSchema)

module.exports = Role