const { DataTypes } = require('sequelize');
const { db } = require('../utils');

const Model = db.define('order_detail', {
    order_id: DataTypes.INTEGER(),
    item_code: DataTypes.STRING(50),
    item_description: DataTypes.STRING(500),
    item_qty: DataTypes.DECIMAL(10, 2),
    unit_price: DataTypes.DECIMAL(10, 2),
    desc_pct: DataTypes.DECIMAL(10, 2),
    desc_amt: DataTypes.DECIMAL(10, 2),
    net_amt: DataTypes.DECIMAL(10, 2)
}, {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Model;