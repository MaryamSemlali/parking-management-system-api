let UsersService = require('./../services/UsersService');
let models = require("../models"),
    User = models.users;

let usersService = new UsersService({ User });

/**
 * Create a new user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const register = async (req, res) => {
    try {
        const user = await usersService.register(req.body, false);

        return res.json({
            ...user,
            status: true
        });
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Login a user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const login = async (req, res) => {
    try {
        const user = await usersService.login(req.body);

        return res.json({
            ...user,
            status: true
        });
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * List connected user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listUser = async (req, res) => {
    try {
        const user = await usersService.listUser(req.user.id);

        return res.json({
            ...user,
            status: true
        });
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Update a user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateUser = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const user = await usersService.updateUser(req.params.userId, req.body);

            return res.json({
                ...user,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Update connected user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const updateConnectedUser = async (req, res) => {
    try {
        const user = await usersService.updateUser(req.user.id, req.body);

        return res.json({
            ...user,
            status: true
        });
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * List all users
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const user = await usersService.listAllUsers(req.query.type);

            return res.json({
                ...user,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Delete a user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const user = await usersService.deleteUser(req.params.userId);

            return res.json({
                ...user,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Deleted connected user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteConnectedUser = async (req, res) => {
    try {
        if (req.user.role === 'Super Admin') {
            return res.json({
                error: "You can't delete super admin account.",
                status: false
            });
        } else {
            const user = await usersService.deleteUser(req.user.id);

            return res.json({
                ...user,
                status: true
            });
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Create admin account
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const createAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const user = await usersService.register(req.body, true);
            delete user.token;

            return res.json({
                ...user,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

module.exports = {
    register,
    login,
    listUser,
    updateUser,
    updateConnectedUser,
    listAllUsers,
    deleteUser,
    deleteConnectedUser,
    createAdmin
};
