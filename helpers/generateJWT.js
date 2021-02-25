const jwt = require('jsonwebtoken');

/**
 * Generate a json web token to authenticate users
 * @param userId User ID from database
 * @param jwtEncryptionKey Json web token encryption key
 * @returns {string} Bearer token that the user use in header authorization
 */
module.exports.generateJWT = (userId, jwtEncryptionKey) => {
    return "Bearer " + jwt.sign({ user_id: userId }, jwtEncryptionKey, {});
};
