const User = require("../models/User");

// Get all User
const getAllUser = async (req, res) => {
    const users = await User.find();
    res.json(users)
};

// Create User
const createUser = async (req,res) => {
    const newUser = new User(req.body);
    await newUser.save()
    res.status(201).json(newUser)
};


module.exports = {getAllUser, createUser}
