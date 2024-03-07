const express = require("express");
const router = express.Router();
const adminController = require('../controller/adminController')

router.post('/create-user', adminController.createUser);

router.post('/edit-user', adminController.editUser);

router.delete('/delete-user', adminController.deleteUser);

module.exports = router;