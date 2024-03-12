const Groups = require("../schema/message.profile");
const User = require("../schema/profileSchema");

async function createGroup(data) {
    try {
        const { groupName, username, members } = data;
        let fetchGroupName = await Groups.find({ groupName })
        if(fetchGroupName.length > 0){
            return { status: 409, message: "groupName is already in use." }; 
        }
        const result = await Groups.create({
            members,
            group_admin: username,
            groupName
        });
        // console.log('result', result)
        return result;
    } catch (error) {
        throw error
    }
}

async function getAllMessages(data) {
    try {
        const { groupName, username } = data;

        const groupData = await Groups.findOne({ groupName });
        const user = groupData.members.find(member => member.username === username);

        if (user) {
            const addedDate = new Date(user.added_date);

            const filteredMessages = groupData.messages.filter(message => {
                const messageDate = new Date(message.message_date);
                return addedDate <= messageDate;
            });
            return filteredMessages;
        } else {
            // console.log("User not found in the group.");
        }
    } catch (error) {
        throw error
    }
}

async function getGroupsForUser(data) {
    try {
      const { username } = data;
      
      // Using find to get an array of groups where the given username is a member
      const groups = await Groups.find({ 'members.username': username });
  
      // Iterate through each group to filter and format messages
      const formattedGroups = await Promise.all(groups.map(async (group) => {
        const { members, messages } = group;
        
        const user = group.members.find(member => member.username === username);
  
        // Assuming you want to filter messages based on some condition
        const filteredMessages = messages.filter(message => {
          const messageDate = new Date(message.message_date);
          // Add your condition here, for example, filtering messages after a specific date
          return messageDate >= user.added_date;
        });
  
        // Return the group with filtered messages
        return {
          ...group.toObject(), // Use toObject to convert the Mongoose document to a plain object
          messages: filteredMessages,
        };
      }));
  
    //   console.log('formattedGroups', formattedGroups);
      return formattedGroups;
    } catch (error) {
      console.error('Error fetching and formatting groups for user:', error);
      throw error;
    }
  }  

async function manageGroup(data) {
    try {
        const { groupName, username, members } = data;
        const result = await Groups.findOneAndUpdate({
            groupName, group_admin: username
        },
            {
                $set: { members }
            });
        // console.log('result', result)
        return result;
    } catch (error) {
        throw error
    }
}

async function deleteGroup(data) {
    try {
        const { groupName, username } = data;
        const result = await Groups.findOneAndDelete({
            groupName, group_admin: username
        })
        // console.log('result', result)
        return result;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createGroup,
    getAllMessages,
    manageGroup,
    getGroupsForUser,
    deleteGroup
};
