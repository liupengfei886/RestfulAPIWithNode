var express = require('express');
var router = express.Router();

const multer = require('multer')
const path = require('path')
// 在初始化 upload 中间件时，传入 dest 选项指定保存上传文件的路径，
// 这里我们选择在 public/upload 目录中再创建一个 avatar 目录用于临时保存上传到的头像
const upload = multer({ dest: path.resolve('./public/upload/avatar/') })

const UserController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

/* GET users listing. */
router.route('/')
  .get(UserController.index)
  .post(validateBody(schemas.userSchema), UserController.newUser)

router.route('/login')
  .post(validateBody(schemas.userSchema), UserController.login)

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UserController.getUser)
  .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], UserController.replaceUser)
  .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)], UserController.updateUser)
  .delete(validateParam(schemas.idSchema, 'userId'), UserController.deleteUser)

router.route('/:userId/cars')
  .get(validateParam(schemas.idSchema, 'userId'), UserController.geyUserCars)
  .post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.carSchema)], UserController.newUserCar)

// router.post 除第一个参数为 URL，后面可以跟任意多个中间件
// upload.single('file') 表示只处理单个上传文件，并且字段名为 file，在后续中间件中就可以通过 req.file 进行获取
router.route('/:userId/avatar')
  .post(validateParam(schemas.idSchema, 'userId'), upload.single('file'), UserController.setUserAvatar)

router.route('/avatar/:avatarPath')
  .get(UserController.getUserAvatar)

module.exports = router;
