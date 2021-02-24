module.exports = function(sequelize, Sequelize) {

    return sequelize.define('users', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        firstName: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastName: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            notEmpty: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        oldPassword: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        role: {
            type: Sequelize.ENUM('Super Admin', 'Admin', 'User'),
            defaultValue: 'User'
        },

        lastLogin: {
            type: Sequelize.DATE
        }
    },{
        underscored: true
    });
};
