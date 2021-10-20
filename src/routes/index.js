const path = require('path');
const route = require('express')();
const router = require('../utils/router');
const apiPrefix = process.env.APP_API_PREFIX || '';

const basePath = path.join(__dirname);
const routes = router.config({ basePath });

routes.forEach(m => {
    route.use(m, require('.' + m));
});
route.use('/health/env', (req, res) => { res.send(process.env) });

exports.instance = (app) => {
    app.use(`/${apiPrefix}`, route);
};

