const { validateParkingSpotData } = require('./../helpers/validateParkingSpotData');

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

            let reservation = await this.reservationsModel.create(data);

            return {
                reservation
            };
        } else {
            throw new Error('Oops! Something went wrong.');
        }
    }
}

module.exports = ParkingSpotService;
