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
}

module.exports = ParkingSpotService;
