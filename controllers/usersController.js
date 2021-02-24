let UsersService = require('./../services/UsersService');
let models = require("../models"),
    User = models.users;

let usersService = new UsersService({ User });

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

module.exports = {
    register,
    login,
    listUser,
    updateUser,
    updateConnectedUser
};
