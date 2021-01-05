const Role = require('../models/role')
const Permission = require('../models/permission')

module.exports = {
  getAllRoles: async (req, res, next) => {
    try {
      const data = await Role.find({})
      res.status(200).json(
        {
          success: true,
          data: data
        }
      )
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  },
  addRole: async (req, res, next) => {
    try {
      const role = new Role(req.value.body)
      await role.save()
      res.status(201).json({
        success: true,
        data: null
      })
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  },
  getRoleData: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const data = await Role.findById(roleId)
      res.status(200).json({
        success: true,
        data: data
      })
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  },
  updateRoleData: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const data = req.value.body
      await Role.findByIdAndUpdate(roleId, data)
      res.status(201).json({
        success: true,
        data: null
      })
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  },
  deleteRole: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const result = await Role.findByIdAndDelete(roleId)
      res.status(204).json()
    } catch (error) {
      console.error(error)
    }
  },
  setPermissionsForRole: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const role = await Role.findById(roleId)

      const permissions = req.body
      role.permissions = permissions
      await role.save()
      res.status(201).json({
        success: true,
        body: null
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false
      })
    }
  },
  getPermissionsUnderRole: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const data = await Role.findById(roleId).populate({ path: 'permissions', select: ['labelName', 'realName'], model: Permission })
      res.status(200).json({
        success: true,
        data: data
      })
    } catch (error) {
      console.error(error)
    }
  }
}