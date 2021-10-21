const { DataTypes } = require('sequelize');
const { db } = require('../../utils');

const Model = db.define('master_item', {
    item_code: { primaryKey: true, type: DataTypes.STRING(50) },
    item_description: DataTypes.STRING(500),
    base_uom: DataTypes.STRING(50),
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Model;