let ParkingSpotService = require('./../services/ParkingSpotService');
let models = require("../models"),
    ParkingSpot = models.parkingSpot,
    Reservations = models.reservations,
    User = models.users;

let parkingSpotService = new ParkingSpotService({ ParkingSpot, User, Reservations });

/**
 * Create a new parking spot
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const create = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.createSpot(req.body);

            return res.json({
                ...parkingSpot,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * List all parking spots
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listAll = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpots = await parkingSpotService.listAll();

            return res.json({
                ...parkingSpots,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Update a parking spot
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const update = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.update(req.params.spotId, req.body);

            return res.json({
                ...parkingSpot,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Delete a parking spot
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const deleteSpot = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.deleteSpot(req.params.spotId);

            return res.json({
                ...parkingSpot,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Assign a parking spot to a user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const assignSpot = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.assignSpot(req.params.spotId, req.params.userId);

            return res.json({
                ...parkingSpot,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * Unassign parking spot
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const unassignSpot = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.unassignSpot(req.params.spotId, req.params.userId);

            return res.json({
                ...parkingSpot,
                status: true
            });
        } else {
            return res.send('Unauthorized');
        }
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * List connected user parking spot
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listMySpots = async (req, res) => {
    try {
        const parkingSpots = await parkingSpotService.listMySpots(req.user.id);

        return res.json({
            ...parkingSpots,
            status: true
        });
    } catch (err) {
        return res.json({
            error: err.message,
            status: false
        });
    }
};

/**
 * List all available parking spots
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const listFreeSpots = async (req, res) => {
    try {
        const parkingSpots = await parkingSpotService.listFreeSpots();

        return res.json({
            ...parkingSpots,
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
    create,
    listAll,
    update,
    deleteSpot,
    assignSpot,
    unassignSpot,
    listMySpots,
    listFreeSpots
};
