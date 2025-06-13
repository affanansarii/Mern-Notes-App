const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = user => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.signup = async (req, res) => {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ email, username });
    user.setPassword(password);
    await user.save();

    res.status(201).json({ user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ token: generateToken(user), user: user._id });
};
