var express = require('express');
var router = express.Router();

const PermissionController = require('../controllers/permissions')
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

router.route('/')
  .get(PermissionController.getAllPermissions)
  .post(validateBody(schemas.permissionSchema), PermissionController.setPermissions)

router.route('/:roleId')
  .get(validateParam(schemas.idSchema, 'roleId'), PermissionController.getPermissionsByRoleId)


module.exports = router;