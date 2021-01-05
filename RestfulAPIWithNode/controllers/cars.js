const Car = require('../models/car')
const User = require('../models/user')

module.exports = {
  index: async (req, res, next) => {
    const cars = await Car.find({})
    res.status(200).json(cars)
  },

  newCar: async (req, res, next) => {
    const { seller } = req.body
    const _seller = await User.findById(seller)

    const newCar = req.body
    delete newCar.seller
    const car = new Car(newCar)
    car.seller = _seller
    await car.save()

    _seller.cars.push(car)
    // 用户需要重新保存车辆数据
    await _seller.save()

    res.status(200).json({
      success: true
    })
  },
  getCar: async (req, res, next) => {
    const { carId } = req.value.params
    const car = await Car.findById(carId)
    res.status(200).json({
      success: true,
      data: car
    })
  },
  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params
    const newCar = req.value.body
    const result = await Car.findByIdAndUpdate(carId, newCar)
    res.status(201).json({
      success: true
    })
  },
  updateCar: async (req, res, next) => {
    const { carId } = req.value.params
    const newCar = req.value.body
    const result = await Car.findByIdAndUpdate(carId, newCar)
    res.status(201).json({
      success: true
    })
  },
  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params
    const car = await Car.findById(carId)
    if (!car) {
      res.status(400).json({
        success: false,
        message: '车辆信息不存在'
      })
    }
    const sellerId = car.seller
    const seller = await User.findById(sellerId)
    await car.remove()
    // mongoose中的pull用于删除数组中的指定元素
    seller.cars.pull(car)
    // 删除用户的相关车辆数据后需要保存
    await seller.save()

    res.status(201).json({
      success: true
    })
  }
}