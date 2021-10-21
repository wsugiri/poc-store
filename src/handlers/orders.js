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
        if (!payload.order_date) {
            payload.order_date = new Date();
        }
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

exports.listOrder = async (event) => {
    const payload = { limit: 10, ...event.query }
    const where = {};
    const attributes = payload.attributes ? payload.attributes.split(',') : null;
    const order = [];

    if (payload.limit) {
        payload.limit = +payload.limit;
    }

    if (payload.page) {
        payload.page = +payload.page;
        payload.offset = (payload.page - 1) * payload.limit
    }

    if (payload.order_no) {
        where.order_no = { [Op.like]: `%${payload.order_no}%` };
    }

    if (payload.cust_code) {
        where.cust_code = payload.cust_code;
    }

    if (payload.status) {
        where.status = { [Op.in]: payload.status.split(',') };
    }

    if (payload.sortBy) {
        order.push([payload.sortBy, payload.sortDir || 'asc']);
    } else {
        order.push(['id', 'desc']);
    }

    try {
        const data = await Order.findAndCountAll({
            where,
            attributes,
            order,
            limit: payload.limit,
            offset: payload.offset,
        });
        return {
            meta: {
                ...payload,
                count: data.count
            },
            data: data.rows
        };
    } catch (err) {
        throw err;
    }
}

exports.updateOrder = async (event) => {
    const { body: payload, params } = event;
    const t = await db.transaction();
    try {
        const resp = await Order.update(payload, { where: params, transaction: t });
        await t.commit();
        return { message: 'update item success', data: resp };
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

exports.detailOrder = async (event) => {
    const { params } = event;
    try {
        const resp = await Order.findOne({
            where: params,
            include: [{
                as: 'items',
                model: OrderDetail
            }],
        });
        return { message: 'get order detail', data: resp };
    } catch (err) {
        throw err;
    }
}

exports.createOrderItem = async (event) => {
    const payload = { ...event.body };
    const t = await db.transaction();
    try {
        const item = await MasterItem.findOne({ where: { item_code: payload.item_code } });
        if (item) {
            payload.item_description = item.item_description;
        }

        const resp = await OrderDetail.create(payload, { transaction: t });
        await t.commit();
        return { message: 'order item success', data: resp };
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

exports.updateOrderItem = async (event) => {
    const { body: payload, params } = event;
    const t = await db.transaction();
    try {
        const resp = await OrderDetail.update(payload, { where: params, transaction: t });
        await t.commit();
        return { message: 'update item success', data: resp };
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

exports.deleteOrderItem = async (event) => {
    const params = event.params;
    const t = await db.transaction();
    try {
        const resp = await OrderDetail.destroy({ where: params, transaction: t });
        await t.commit();
        return { message: 'delete item success', data: resp };
    } catch (err) {
        await t.rollback();
        throw err;
    }
}