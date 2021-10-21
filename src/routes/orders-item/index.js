const app = require('express').Router();
const handler = require('../../utils/handler');

app.post('/', handler.load('orders', 'createOrderItem'));
app.put('/:id', handler.load('orders', 'updateOrderItem'));
app.delete('/:id', handler.load('orders', 'deleteOrderItem'));

module.exports = app;
