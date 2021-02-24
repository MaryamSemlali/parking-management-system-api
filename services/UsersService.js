const { validateUserData } = require('./../helpers/validateUserData');
const { generateJWT } = require('./../helpers/generateJWT');

class UsersService {

    constructor({ User }) {
        this.userModel = User;
    }

    async register(data, isAdmin) {
        const userData = validateUserData(data, isAdmin);

        if (userData.isValid === true) {
            let user = await this.userModel.findOne({ where: { email: userData.validatedUserData.email } });

            if (user) {
                throw new Error('Oops! User already exits.');
            } else {
                user = await this.userModel.create(userData.validatedUserData);

                return {
                    token: generateJWT(user.id, process.env.JWT_ENCRYPTION_KEY),
                    user: user
                }
            }
        } else {
            throw new Error('Oops! User data is not valid.');
        }
    }
}

module.exports = UsersService;
