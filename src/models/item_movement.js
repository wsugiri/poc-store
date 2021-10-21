const { DataTypes } = require('sequelize');
const { db } = require('../../utils');

const Model = db.define('item_movement', {
    movement_type: DataTypes.STRING(10),   // IN or OUT
    doc_type: DataTypes.STRING(20),        // related GI or GR 
    doc_ref: DataTypes.STRING(50),
    item_code: DataTypes.STRING(50),
    item_qty: DataTypes.DECIMAL(10, 2),
    item_uom: DataTypes.STRING(50),
    original_item_qty: DataTypes.DECIMAL(10, 2),
    original_uom: DataTypes.STRING(50),
    uom_conversion: DataTypes.DECIMAL(10, 2),
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Model;