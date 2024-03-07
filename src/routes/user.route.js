const express = require("express");
const router = express.Router();
const userController = require('../controller/userController')

router.post('/create-group', userController.createGroup);

router.post('/update-group', userController.updateGroup);    // this is route for add members in group.

router.delete('/delete-group', userController.deleteGroup);

router.get('/fetch-groups', userController.fetchGroups);


module.exports = router;