const User = require("../schema/profileSchema");

async function createUser(data) {
    try {
        const { username, password, mobileNumber, email } = data;
        // console.log('data',data)
        let result = await User.find({ username })
        if (result.length > 0) {
            return { status: 409, message: "username is already in use." };
        } else {
            result = await User.create({
                username,
                password,
                mobileNumber,
                email
            });
            // console.log('result',result)
            return result;
        }
    } catch (error) {
        throw error
    }
}


async function editUser(data) {
    try {
        const { username, password, mobileNumber, email } = data;
        const result = await User.findOneAndUpdate({
            username
        },
            {
                $set: {
                    password,
                    mobileNumber,
                    email
                }
            }, 
            { new: true });
            if (!result) {
                return { status:404, message: 'User not found' };
            }
        return result;
    } catch (error) {
        throw error
    }
}

async function deleteUser(data) {
    try {
        const { username } = data;
        const result = await User.findOneAndDelete({
            username
        });
        return result;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    editUser,
    deleteUser
};
