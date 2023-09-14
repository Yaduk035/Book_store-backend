const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Set the expiration time for the token
  });
  return token;
};

// Function to verify a JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
