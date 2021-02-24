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

module.exports = {
    register,
    login
};
