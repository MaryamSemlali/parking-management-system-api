module.exports = function(sequelize, Sequelize) {

    return sequelize.define('reservations', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        }
    }, {
        underscored: true
    });
};
