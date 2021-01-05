const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  // 上级部门
  superiorUnit: {
    _id: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String, 
      required: true
    }
  },
  // 下级部门
  subordinateUnit: [{
    _id: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String, 
      required: true
    }
  }],
  staffs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'staff'
    }
  ]
})

const Role = mongoose.model('role', roleSchema)

module.exports = Role