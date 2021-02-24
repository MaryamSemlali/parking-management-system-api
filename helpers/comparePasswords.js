const bcrypt = require('bcrypt');

module.exports.comparePasswords = async (userPassword, enteredPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
};
