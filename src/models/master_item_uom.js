const { DataTypes } = require('sequelize');
const { db } = require('../../utils');

const Model = db.define('master_item_uom', {
    item_code: DataTypes.STRING(50),
    uom_code: DataTypes.STRING(50),
    uom_conversion: DataTypes.DECIMAL(10, 2),
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Model;