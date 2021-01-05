const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'car'
  }],
  avatar: {
    filename: String,
    filePath: String
  }
})

// schema中的虚拟属性方法相当于vue中的计算属性，它是通过已定义的schema属性的计算\组合\拼接得到的新的值
userSchema.virtual('id', {
  localField: '_id'
})

// 设置允许虚拟属性被查询到
userSchema.options.toJSON = {
  virtuals: true,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
}

const User = mongoose.model('user', userSchema)

module.exports = User