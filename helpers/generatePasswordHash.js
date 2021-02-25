const bcrypt = require('bcrypt');

/**
 * Generate a password hash to store in database
 * @param password entered password
 * @returns {*}
 */
module.exports.generatePasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
