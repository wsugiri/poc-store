const app = require('express').Router();
const handler = require('../../utils/handler');

app.get('/', handler.load('orders', 'listOrder'));
app.get('/:id', handler.load('orders', 'detailOrder'));
app.put('/:id', handler.load('orders', 'updateOrder'));
app.post('/', handler.load('orders', 'createOrder'));

module.exports = app;
