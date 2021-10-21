const { DataTypes } = require('sequelize');
const { db } = require('../../utils');

const Model = db.define('master_item_uom', {
    item_code: DataTypes.STRING(50),
    location_code: DataTypes.STRING(50),
    qty_onhand: DataTypes.DECIMAL(10, 2),
    qty_reserved: DataTypes.DECIMAL(10, 2),
    qty_allocated: DataTypes.DECIMAL(10, 2),
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Model;