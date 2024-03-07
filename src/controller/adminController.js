
const adminService = require('../services/adminServices');

async function createUser(req, res) {
    try {
        // console.log('req.body', req.body)
        const create_user = await adminService.createUser(req.body); 
        return res.json({success : true, message: 'user successfully created', data : create_user});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'user not created', error : error});
    }
}

async function editUser(req, res) {
    try {
        const edit_user = await adminService.editUser(req.body); 
        return res.json({success : true, message: 'user successfully updated', data : edit_user});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'user not edit', error : error});
    }
}

async function deleteUser(req, res) {
    try {
        const edit_user = await adminService.deleteUser(req.body); 
        return res.json({success : true, message: 'user successfully deleted', data : edit_user});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'user not delete', error : error});
    }
}

module.exports = {
    createUser,
    editUser,
    deleteUser
};
