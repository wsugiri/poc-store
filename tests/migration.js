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
        { item_code: 'IT004', item_description: 'Jala Ikan', base_uom: 'pcs' },
        { item_code: 'IT005', item_description: 'Bibit Ikan', base_uom: 'gram' },
        { item_code: 'IT006', item_description: 'Selang Air', base_uom: 'pcs' },
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
