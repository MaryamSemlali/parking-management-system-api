module.exports = function(sequelize, Sequelize) {

    return sequelize.define('parkingSpot', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },

        spotNumber: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        floorNumber: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    }, {
        underscored: true
    });
};
