const User = require("../schema/profileSchema");
const bcrypt = require('bcrypt');

async function createUser(data) {
    try {
        const { username, password, mobileNumber, email } = data;

        // Check if the username already exists
        let result = await User.find({ username });
        if (result.length > 0) {
            return { status: 409, message: "Username is already in use." };
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            result = await User.create({
                username,
                password: hashedPassword, // Store the hashed password
                mobileNumber,
                email
            });

            return result;
        }
    } catch (error) {
        throw error;
    }
}

async function editUser(data) {
    try {
        const { username, password, mobileNumber, email } = data;

        // Hash the new password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateFields = {
            ...(hashedPassword && { password: hashedPassword }), // Only update password if provided
            mobileNumber,
            email
        };

        const result = await User.findOneAndUpdate(
            { username },
            { $set: updateFields },
            { new: true }
        );

        if (!result) {
            return { status: 404, message: 'User not found' };
        }

        return result;
    } catch (error) {
        throw error;
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
