const mongoose = require('mongoose');

const message_schema = new mongoose.Schema({
    message: String, 
    sender: String,
    message_date: Date,
});

const members_schema = new mongoose.Schema({
    username: String, 
    added_date : Date,
});

const group_schema = new mongoose.Schema({
    groupName : {
        type : String,
        required  : true,
    },
    group_admin : {
        type : String,
        required : true,
    },
    messages: [message_schema],
    members : {
        type : [members_schema],
        required : true
    }, 
},{
    timestamps : true
});


//for the group for unique using uuid 
  
const Groups = mongoose.model('groups', group_schema);

module.exports = Groups;