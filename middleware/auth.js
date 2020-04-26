const jwt = require('jsonwebtoken');
const config = require('config');

// Only pertains to protected routes

module.exports = function (req, res, next) {
    // Get token from header

    const token = req.header('x-auth-token');

    // Check if it exists
    if (!token) {
        return res.status(401).json({msg:'unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'Token not valid'})
    }
}