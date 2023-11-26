const express = require('express')
const router = express.Router()
const RegistrationController = require('../controllers/registrationController')

router.get('/student/:id', RegistrationController.getStudentByID)
router.get('/students-list', RegistrationController.getAllStudents)
router.post('/create-profile', RegistrationController.createProfile)
router.post('/update-profile/:id', RegistrationController.updateProfile)
router.post('/delete-profile', RegistrationController.deleteProfile)

module.exports = router