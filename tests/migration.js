require('dotenv').config();

const db = require('../src/utils/db');
const MasterItem = require('../src/models/master_item');
const MasterItemUom = require('../src/models/master_item_uom');

const initializeTable = async () => {
    await MasterItem.sync({ force: true });
    await MasterItemUom.sync({ force: true });
}


const initializeData = async () => {
    await MasterItem.bulkCreate([
        { item_code: 'IT001', item_description: 'Pakan Ikan Lele', base_uom: 'gram' },
        { item_code: 'IT002', item_description: 'Pakan Ikan Jamur', base_uom: 'gram' },
        { item_code: 'IT003', item_description: 'Pakan Ikan Organik', base_uom: 'gram' },
        { item_code: 'IT004', item_description: 'Pakan Ikan Gurame', base_uom: 'gram' },

        { item_code: 'BI001', item_description: 'Bibit Ikan Lele', base_uom: 'gram' },
        { item_code: 'BI002', item_description: 'Bibit Ikan Mas', base_uom: 'gram' },
        { item_code: 'BI003', item_description: 'Bibit Ikan Gurame', base_uom: 'gram' },

        { item_code: 'IK001', item_description: 'Ikan Lele', base_uom: 'kg' },
        { item_code: 'IK002', item_description: 'Ikan Lele Besar', base_uom: 'kg' },
        { item_code: 'IK003', item_description: 'Ikan Mas', base_uom: 'kg' },
        { item_code: 'IK004', item_description: 'Ikan Mas Besar', base_uom: 'kg' },
        { item_code: 'IK005', item_description: 'Ikan Gurame', base_uom: 'kg' },
        { item_code: 'IK006', item_description: 'Ikan Gurame Besar', base_uom: 'kg' },
    ]);
}

const run = async () => {
    try {
        await initializeTable();
        await initializeData();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

run().finally(() => {
    console.log('-- end call --');
    // db.close();
});
