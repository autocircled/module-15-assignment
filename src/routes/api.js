const express = require('express')
const router = express.Router()
const RegistrationController = require('../controllers/registrationController')

router.get('/profileList', RegistrationController.getAll)
router.post('/createProfile', RegistrationController.createProfile)
router.post('/updateProfile/:id', RegistrationController.updateProfile)
router.post('/deleteProfile', RegistrationController.deleteProfile)

module.exports = router