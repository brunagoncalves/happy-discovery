const express = require('express');
const pages = require('./pages');

const route = express.Router();

route.get('/', pages.pageLanding);
route.get('/show-orphanage', pages.showOrphanage);
route.get('/map-orphanages', pages.mapOrphanages);
route.get('/create-orphanage', pages.createOrphanage);
route.post('/save-orphanage', pages.saveOrphanage);

module.exports = route;
