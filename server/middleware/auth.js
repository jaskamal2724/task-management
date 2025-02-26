import jwt from "jsonwebtoken"

export default (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user payload to request object
    
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};