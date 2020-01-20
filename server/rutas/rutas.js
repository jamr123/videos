'use strict'

const express = require('express');
const api = express.Router();
const dps=require('../controladores/dps');
///////rutas--login//////

api.post('/dps', dps.dpslog);

module.exports = api

