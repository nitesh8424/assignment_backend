
const adminService = require('../services/adminServices');

async function createUser(req, res) {
    try {
        const create_user = await adminService.createUser(req.body); 
        if (create_user?.status === 409) {
            delete create_user?.status;
            return res.status(409).json({ success: false, data: create_user });
        } else {
            return res.status(200).json({ success: true, message: 'User successfully created', data: create_user });
        }
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: 'User not created', error: error });
    }
}


async function editUser(req, res) {
    try {
        const edit_user = await adminService.editUser(req.body); 
        if(edit_user.status === 404){
            return res.status(404).json({success : false, data : edit_user.message});
        }else{
            return res.json({success : true, message: 'user successfully updated', data : edit_user});
        }
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'user not edit', error : error||error.message});
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
