const express = require('express')
const router = express.Router() 

const RoleController = require('../controllers/roles')
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

router.route('/')
  .get(RoleController.getAllRoles)
  .post(validateBody(schemas.addRoleSchema), RoleController.addRole)

router.route('/:roleId')
  .get(validateParam(schemas.idSchema, 'roleId'), RoleController.getRoleData)
  .patch(validateBody(schemas.updateRoleSchema), RoleController.updateRoleData)
  .delete(validateParam(schemas.idSchema, 'roleId'), RoleController.deleteRole)

router.route('/:roleId/permission')
  .get(validateParam(schemas.idSchema, 'roleId'), RoleController.getPermissionsUnderRole)
  .post(validateParam(schemas.idSchema, 'roleId'), RoleController.setPermissionsForRole)

module.exports = router
