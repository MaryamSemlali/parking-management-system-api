let ParkingSpotService = require('./../services/ParkingSpotService');
let models = require("../models"),
    ParkingSpot = models.parkingSpot,
    Reservations = models.reservations,
    User = models.users;

let parkingSpotService = new ParkingSpotService({ ParkingSpot, User, Reservations });

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

const assignSpot = async (req, res) => {
    try {
        if (req.user.role !== 'User') {
            const parkingSpot = await parkingSpotService.assignSpot(req.params.spotId, req.params.userId, req.body);

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

module.exports = {
    create,
    listAll,
    update,
    deleteSpot,
    assignSpot,
    unassignSpot,
    listMySpots
};
