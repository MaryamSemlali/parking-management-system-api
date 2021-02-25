const bcrypt = require('bcrypt');

/**
 * Compare a password with a hashed password to check if they match
 * @param userPassword Hashed password from database
 * @param enteredPassword Entered clear character password
 * @returns {Promise<*>}
 */
module.exports.comparePasswords = async (userPassword, enteredPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
};
