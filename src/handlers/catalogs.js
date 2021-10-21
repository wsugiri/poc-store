const { Op } = require('sequelize');
const MasterItem = require('../models/master_item');

exports.catalogList = async (event) => {
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

    if (payload.item_code) {
        where.item_code = payload.item_code;
    }

    if (payload.item_description) {
        where.item_description = {
            [Op.like]: `%${payload.item_description}%`,
        }
    }

    try {
        const data = await MasterItem.findAndCountAll({
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