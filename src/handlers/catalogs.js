const MasterItem = require('../models/master_item');

exports.catalogList = async (event) => {
    const payload = { limit: 10, ...event.query }
    const where = {};
    const attributes = payload.attributes ? payload.attributes.split(',') : null;
    const order = [];

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