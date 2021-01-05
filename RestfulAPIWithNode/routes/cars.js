const { Router } = require('express');
var express = require('express');
const { model } = require('mongoose');
var router = express.Router();

const CarController = require('../controllers/cars')
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

router.route('/')
  .get(CarController.index)
  .post(validateBody(schemas.carSchema), CarController.newCar)

router.route('/:carId')
  .get(validateParam(schemas.idSchema, 'carId'), CarController.getCar)
  .put([validateParam(schemas.idSchema, 'carId'), validateBody(schemas.putCarSchema)], CarController.replaceCar)
  .patch([validateParam(schemas.idSchema, 'carId'), validateBody(schemas.patchCarSchema)], CarController.updateCar)
  .delete(validateParam(schemas.idSchema, 'carId'), CarController.deleteCar)

module.exports = router