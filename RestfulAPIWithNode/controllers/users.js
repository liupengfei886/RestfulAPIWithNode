const User = require('../models/user')
const Car = require('../models/car')
const path = require('path')
const fs = require('fs')
const utils = require('../public/utils/index')

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json({
        success: true,
        data: users
      })
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const { firstName, lastName, email } = req.value.body
      const result = await User.find({ firstName: firstName })
      if (result && result.length) {
        const user = result.pop()
        if (user.lastName !== lastName) {
          res.status(200).json({
            success: false,
            message: '名字不存在',
            data: null
          })
        } else {
          if (user.email !== email) {
            res.status(200).json({
              success: false,
              message: '邮箱不正确',
              data: null
            })
          } else {
            utils.createToken(req, res, next)
          }
        }
      } else {
        res.status(200).json({
          success: false,
          message: '姓氏不存在',
          data: null
        })
      }
      console.log('result', result)
    } catch (error) {
      console.error(error)
    }
  },
  newUser: async (req, res, next) => {
    try {
      // 没加校验之前
      // const newUser = new User(req.body)
      const result = await utils.verifyToken(req, res, next)
      if (!result) {
        res.status(401).json({
          success: false,
          message: '身份认证失败',
          data: null
        })
      } else {
        const newUser = new User(req.value.body)
        const user = await newUser.save()
        res.status(201).json(user)
      }
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      // 没加校验之前的写法
      // const { userId } = req.params
      const { userId } = req.value.params
      const user = await User.findById(userId)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
  replaceUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params
      const newUser = req.value.body
      await User.findByIdAndUpdate(userId, newUser)
      res.status(201).json({
        success: true
      })
    } catch (error) {
      next(error)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params
      const newUser = req.value.body
      await User.findByIdAndUpdate(userId, newUser)
      res.status(201).json({
        success: true
      })
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params
      await User.findByIdAndDelete(userId)
      res.status(204).json({
        success: true
      })
    } catch (error) {
      next(error)
    }
  },
  geyUserCars: async (req, res, next) => {
    try {
      const { userId } = req.value.params
      const result = await User.findById(userId).populate({path: 'cars',  model: Car, select: ['make', 'model', 'seller']})
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      next(error)
    }
  },
  newUserCar: async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)
    const newCar = new Car(req.value.body)
    newCar.seller = user
    await newCar.save()

    user.cars.push(newCar)
    await user.save()
    res.status(201).json({
      success: true
    })
  },
  setUserAvatar: async (req, res, next) => {
    const tempPath = req.file.path;
    const imgUrl = req.file.filename;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve('./public/upload/avatar/' + imgUrl + ext);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      fs.rename(tempPath, targetPath, async (err) => {
        if (err) throw err;
        const { userId } = req.value.params
        const user = await User.findById(userId)
        user.avatar = {
          filename: req.file.originalname,
          filePath: imgUrl + ext
        }
        await user.save()
        res.status(201).json({
          success: true,
          message: '上传成功',
          data: user.avatar
        })
      });
    } else {
      fs.unlink(tempPath, function(err) {
        if (err) throw err;
        res.json(500, { error: '只允许上传图片文件' });
      });
    }
  },
  
  getUserAvatar: async (req, res, next) => {
    const { avatarPath } = req.params
    res.sendFile( path.resolve(__dirname, `../public/upload/avatar/${avatarPath}`));
  }
}