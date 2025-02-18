import jwt from 'jsonwebtoken';
import {User} from '../models/user.js';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // After verifying token, use decoded information to find the user in the database
      try {
        const user = await User.findById(decoded.userId).exec();
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;  // Attach the user to the request object
        next();
      } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
      }
    });
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
};
