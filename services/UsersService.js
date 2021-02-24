const { validateUserData } = require('./../helpers/validateUserData');
const { generateJWT } = require('./../helpers/generateJWT');
const { comparePasswords } = require('./../helpers/comparePasswords');
const { generatePasswordHash } = require('./../helpers/generatePasswordHash');

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
                };
            }
        } else {
            throw new Error('Oops! User data is not valid.');
        }
    }

    async login(data) {
        if (data.email && data.password) {
            let user = await this.userModel.findOne({ where: { email: data.email } });

            if (user) {
                let isPasswordValid = await comparePasswords(user.password, data.password);

                if (isPasswordValid) {
                    return {
                        token: generateJWT(user.id, process.env.JWT_ENCRYPTION_KEY),
                        user: user
                    };
                } else {
                    throw new Error('Oops! Wrong password.');
                }
            } else {
                throw new Error('Oops! Not registered.');
            }
        } else {
            throw new Error('Oops! User data is not valid.');
        }
    }

    async listUser(userId) {
        let user = await this.userModel.findByPk(userId);

        return {
            user
        };
    }

    async updateUser(userId, data) {
        let user = await this.userModel.findByPk(userId);

        if (user) {
            if (data.password) {
                data.password = generatePasswordHash(data.password);
            }
            await this.userModel.update(data, {
                where: { id: userId }
            });

            user = await this.userModel.findByPk(userId);

            return {
                user
            };
        } else {
            throw new Error('Oops! User not found.');
        }
    }

    async listAllUsers(type) {
        let options = {};
        if (type) {
            options = {
                where: {
                    role: type
                }
            };
        }
        let users = await this.userModel.findAndCountAll(options);

        return {
            users: users.rows,
            total: users.count
        };
    }

    async deleteUser(userId) {
        let user = await this.userModel.findByPk(userId);

        if (user) {
            if (user.role === 'Super Admin') {
                return {
                    message: "You can't delete super admin account."
                };
            } else {
                await this.userModel.destroy({
                    where: { id: userId }
                });

                return {
                    message: 'User deleted successfully.'
                };
            }
        } else {
            throw new Error('Oops! User not found.');
        }
    }
}

module.exports = UsersService;
