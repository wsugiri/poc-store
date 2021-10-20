const { Sequelize } = require('sequelize');

module.exports = {
    dbAuth: new Sequelize(process.env.DB_AUTH.replace('pg://', 'postgres://')),
}