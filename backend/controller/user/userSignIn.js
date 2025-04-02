const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body; 

    if (!email || !password) {
      return res.status(400).json({ message: 'Enter a valid email and password' });
    }

    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { _userId: user._id, email: user.email, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    );

    const tokenOption = {
      httpOnly : true,
      secure : true
    }

    res.cookie("token",token,tokenOption).json({
      success: true,
      message: 'Login successful',
      token,
      user: { email: user.email, role: user.role },
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = userLoginController;


