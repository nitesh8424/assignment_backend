const express = require("express");
const router = express.Router();
const userController = require('../controller/userController');
const { validate, createUserGroup } = require("../middleware/validation");

router.post('/create-group', validate(createUserGroup), userController.createGroup);

router.post('/update-group', validate(createUserGroup), userController.updateGroup);    // this is route for add members in group.

router.delete('/delete-group', userController.deleteGroup);

router.get('/fetch-groups', userController.fetchGroups);


module.exports = router;