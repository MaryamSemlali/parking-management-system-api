const bcrypt = require('bcrypt');

module.exports.generatePasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
