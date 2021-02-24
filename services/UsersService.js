const { validateUserData } = require('./../helpers/validateUserData');

class UsersService {

    constructor({ User }) {
        this.userModel = User;
    }

    async register(data, isAdmin) {
        const userData = validateUserData(data, isAdmin);

        if (userData.isValid === true) {
            const user = await this.userModel.findOne({ where: { email: userData.validatedUserData.email } });

            if (user) {
                throw new Error('Oops! User already exits.');
            } else {
                return this.userModel.create(userData.validatedUserData);
            }
        } else {
            throw new Error('Oops! User data is not valid.');
        }
    }
}

module.exports = UsersService;
