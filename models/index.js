let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");

let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'database.js')).db[env];

let sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

/*
Instead of requiring model by model, we use this to automatically require all models at once
 */
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "relations.js");
}).forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});


Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Relations
require('./relations.js')(db);

module.exports = db;
