const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
}, {
    collection: 'admin',
    timestamps: true,
});

const AdminProfile = mongoose.model('admin', adminSchema);

module.exports = AdminProfile;
