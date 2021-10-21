const { DataTypes } = require('sequelize');
const { db } = require('../../utils');

const Model = db.define('order', {
    order_no: DataTypes.STRING(30),
    order_date: DataTypes.DATE(),
    notes: DataTypes.TEXT(),
    status: DataTypes.INTEGER(),
}, {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

module.exports = Model;