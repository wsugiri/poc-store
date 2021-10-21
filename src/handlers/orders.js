const { Op } = require('sequelize');
const { db } = require('../utils');
const MasterItem = require('../models/master_item');
const Order = require('../models/order');
const OrderDetail = require('../models/order_detail');

exports.createOrder = async (event) => {
    const payload = { ...event.body };
    const t = await db.transaction();
    try {
        const items = await MasterItem.findAll({
            where: {
                item_code: {
                    [Op.in]: (payload.items || []).map(m => m.item_code),
                }
            }
        })
        const order = await Order.create(payload, { transaction: t });
        if (order && order.id && payload.items) {
            const payloadItems = payload.items.map(m => {
                const item = items.find(n => n.item_code === m.item_code);
                return {
                    ...m,
                    item_description: item ? item.item_description : '',
                    order_id: order.id
                }
            });
            await OrderDetail.bulkCreate(payloadItems, { transaction: t });
        }

        const resp = await Order.findOne({
            where: { id: order.id },
            include: [{
                as: 'items',
                model: OrderDetail
            }],
            transaction: t
        })

        await t.commit();
        return { message: 'insert success', data: resp };
    } catch (err) {
        await t.rollback();
        throw err;
    }
}