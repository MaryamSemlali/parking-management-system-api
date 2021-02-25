const { validateParkingSpotData } = require('./../helpers/validateParkingSpotData');
const moment = require('moment');

class ParkingSpotService {

    constructor({ ParkingSpot, User, Reservations }) {
        this.parkingSpotModel = ParkingSpot;
        this.userModel = User;
        this.reservationsModel = Reservations;
    }

    async createSpot(data) {
        const spotData = validateParkingSpotData(data);

        if (spotData.isValid === true) {
            let spot = await this.parkingSpotModel.findOne({ where: { spotNumber: spotData.validatedSpotData.spotNumber } });

            if (spot) {
                throw new Error('Oops! Parking spot already exits.');
            } else {
                spot = await this.parkingSpotModel.create(spotData.validatedSpotData);

                return {
                    parkingSpot: spot
                };
            }
        } else {
            throw new Error('Oops! Parking spot data is not valid.');
        }
    }

    async listAll() {
        let parkingSpots = await this.parkingSpotModel.findAndCountAll();

        return {
            parkingSpots: parkingSpots.rows,
            total: parkingSpots.count
        };
    }

    async update(spotId, data) {
        let parkingSpot = await this.parkingSpotModel.findByPk(spotId);

        if (parkingSpot) {
            await this.parkingSpotModel.update(data, {
                where: { id: spotId }
            });

            parkingSpot = await this.parkingSpotModel.findByPk(spotId);

            return {
                parkingSpot
            };
        } else {
            throw new Error('Oops! Parking spot not found.');
        }
    }

    async deleteSpot(spotId) {
        let parkingSpot = await this.parkingSpotModel.findByPk(spotId);

        if (parkingSpot) {
            await this.parkingSpotModel.destroy({
                where: { id: spotId }
            });

            return {
                message: 'Parking spot deleted successfully.'
            };
        } else {
            throw new Error('Oops! Parking spot not found.');
        }
    }

    async assignSpot(spotId, userId, data) {
        let parkingSpot = await this.parkingSpotModel.findByPk(spotId);
        let user = await this.userModel.findByPk(userId);

        if (parkingSpot && user) {
            data.userId = user.id;
            data.parkingSpotId = parkingSpot.id;

            let reservation = await this.reservationsModel.findOne({ where: { userId: data.userId } });

            if (reservation) {
                throw new Error('Oops! User already have a parking spot.');
            } else {
                reservation = await this.reservationsModel.create(data);
            }

            return {
                reservation
            };
        } else {
            throw new Error('Oops! Something went wrong.');
        }
    }

    async unassignSpot(spotId, userId) {
        let parkingSpot = await this.parkingSpotModel.findByPk(spotId);
        let user = await this.userModel.findByPk(userId);

        if (parkingSpot && user) {
            await this.reservationsModel.destroy({
                where: { userId: userId, parkingSpotId: spotId }
            });

            return {
                message: 'Parking spot unassigned successfully.'
            };
        } else {
            throw new Error('Oops! Something went wrong.');
        }
    }

    async listMySpots(userId) {
        let user = await this.userModel.findByPk(userId);

        if (user) {
            let reservation = await user.getReservation();
            if (reservation) {
                let parkingSpot = await reservation.getParkingSpot();

                if (moment(new Date()).isSameOrBefore(reservation.reservationEnd)) {
                    return {
                        parkingSpots: parkingSpot,
                    };
                } else {
                    return {
                        message: 'You have no parking spot.',
                    };
                }
            } else {
                throw new Error('Oops! You have no parking spot.');
            }

        } else {
            throw new Error('Oops! Something went wrong.');
        }
    }
}

module.exports = ParkingSpotService;
