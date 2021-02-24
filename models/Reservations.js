module.exports = function(sequelize, Sequelize) {

    return sequelize.define('reservations', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        reservationStart: {
            type: Sequelize.DATE
        },

        reservationEnd: {
            type: Sequelize.DATE
        }
    }, {
        underscored: true
    });
};
