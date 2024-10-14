const jwt = require('jsonwebtoken');

// Secret key for signing the token (in production, store this securely, e.g., in environment variables)
const JWT_SECRET = 'your_jwt_secret_key';  // Replace with a more secure key
const JWT_EXPIRES_IN = '1h';  // Token validity period

// Function to generate a token for a user
const generateToken = (user) => {
  // Payload will contain user information, typically the user ID and role
  const payload = {
    id: user._id,        // MongoDB ObjectId of the user
    role: user.role      // 'admin', 'wholesaler', 'retailer', 'delivery'
  };

  // Generate a signed JWT token with the payload and secret
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  // Token is typically sent in the Authorization header (e.g., 'Bearer <token>')
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and attach the payload to the request object
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the decoded user information (e.g., id, role)
    next();  // Pass to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ status: false, message: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
