// sets javascript token to be used for authentication
const jwt = require('jsonwebtoken');

// checks if the token is valid
module.exports = (req, res, next) => {
  try {
    // splits the token into two parts
    const token = req.headers.authorization.split(" ")[1];
    // verifies the token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // sets the userId to the decoded token
    const userId = decodedToken.userId;
    // sets the userId to the request
    req.auth = { userId };
    // if the userId is not the same as the one in the request, an error is thrown
    if (req.body.userId && req.body.userId !== userId) {
      res.status(403).json({
        error: error
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};