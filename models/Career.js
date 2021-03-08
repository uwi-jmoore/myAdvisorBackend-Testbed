const { Sequelize } = require("sequelize");
const db = require("../db");

// NOTE: Course model may require more fields
const Career = db.define("career", {
    name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = Career;