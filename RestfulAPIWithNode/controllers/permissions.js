const Permission = require('../models/permission')
const Role = require('../models/role')

module.exports = {
  getAllPermissions: async (req, res, next) => {
    try {
      const data = await Permission.find({})
      res.status(201).json({
        success: true,
        data: data
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false
      })
    }
  },
  setPermissions: async (req, res, next) => {
    try {
      const newPermission = new Permission(req.value.body)
      await newPermission.save()
      res.status(201).json({
        success: true,
        data: null
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false
      })
    }
  },
  getPermissionsByRoleId: async (req, res, next) => {
    try {
      const { roleId } = req.value.params
      const data = await Role.findById(roleId)
      res.status(200).json({
        success: true,
        data: data.permissions
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false
      })
    }
  }
}