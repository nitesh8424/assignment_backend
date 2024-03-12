const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController');
const { createUserValidation, validate } = require("../middleware/validation");

router.post('/create-user', validate(createUserValidation), adminController.createUser);

router.post('/edit-user', validate(createUserValidation), adminController.editUser);

router.delete('/delete-user', adminController.deleteUser);

module.exports = router;