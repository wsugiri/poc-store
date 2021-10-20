const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DB_DATA.replace('pg://', 'postgres://'));

module.exports = db;