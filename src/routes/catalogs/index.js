const app = require('express').Router();
const handler = require('../../utils/handler');

app.get('/', handler.load('catalogs', 'catalogList'));

module.exports = app;
