const app = require('express').Router();
const handler = require('../../utils/handler');

app.post('/', handler.load('orders', 'createOrder'));

module.exports = app;
