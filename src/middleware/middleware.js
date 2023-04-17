const jwt = require('jsonwebtoken');


exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token is not recived' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,"the-secret-key", (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: error.message });
      }
      req.userId = decoded.userId 
      next();
    });
  };
  