const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const { username, password, role = 'user' } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await UserModel.create(username, hashedPassword, role);
        res.status(201).json(newUser);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({ token });
    } catch (error) { res.status(500).json({ message: error.message }); }
};