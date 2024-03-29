const userService = require('../services/userServices');

async function createGroup (req,res){
    try {
        const create_group = await userService.createGroup(req.body); 
        if (create_group?.status === 409) {
            delete create_group?.status;
            return res.status(409).json({ success: false, data: create_group });
        } else {
            return res.status(200).json({ success: true, message: 'group successfully created', data: create_group });
        }
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'user not created', error : error});
    }
}


async function fetchGroupMessages (req,res){
    try {
        const getGroupMessage = await userService.getAllMessages(req.query); 
        return res.json({success : true, data:getGroupMessage});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'could not find any message', error : error});
    }
}

async function fetchGroups (req,res){
    try {
        const fetchGroups = await userService.getGroupsForUser(req.query); 
        return res.json({success : true, data:fetchGroups});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'do not have any group', error : error});
    }
}

async function updateGroup (req,res){
    try {
        const sendMessage = await userService.manageGroup(req.body); 
        return res.json({success : true, message : 'group updated.', data:sendMessage});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'can not update group.', error : error});
    }
}

async function deleteGroup (req,res){
    try {
        const sendMessage = await userService.deleteGroup(req.body); 
        return res.json({success : true, message : 'group deleted.'});
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(error.status || 500).json({success : false, message: 'can not update group.', error : error});
    }
}

module.exports = {createGroup, fetchGroupMessages, updateGroup, fetchGroups, deleteGroup}

