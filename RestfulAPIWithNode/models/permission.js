const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  labelName: {
    type: String, 
    required: true
  },
  realName: {
    type: String, 
    required: true
  }
})

const Permission = mongoose.model('permission', permissionSchema)

module.exports = Permission