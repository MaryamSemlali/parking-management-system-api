const jwt = require('jsonwebtoken');

module.exports.generateJWT = (userId, jwtEncryptionKey) => {
    return "Bearer " + jwt.sign({ user_id: userId }, jwtEncryptionKey, {});
};
