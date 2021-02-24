const { validateParkingSpotData } = require('./../helpers/validateParkingSpotData');

class ParkingSpotService {

    constructor({ ParkingSpot }) {
        this.parkingSpotModel = ParkingSpot;
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
}

module.exports = ParkingSpotService;
