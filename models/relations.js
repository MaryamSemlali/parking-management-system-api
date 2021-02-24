module.exports = (db) => {
    db.users.hasOne(db.reservations, { foreignKey: 'userId' });
    db.reservations.belongsTo(db.users, { foreignKey: 'userId' });

    db.parkingSpot.hasOne(db.reservations, { foreignKey: 'parkingSpotId' });
    db.reservations.belongsTo(db.parkingSpot, { foreignKey: 'parkingSpotId' });
};
