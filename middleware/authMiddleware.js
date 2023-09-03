const jwt = require("jsonwebtoken");

// Middleware function for JWT token verification
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]; // Extract the token from the request headers

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secret-key"); // Verify the token
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid" });
  }
}

module.exports = verifyToken;
