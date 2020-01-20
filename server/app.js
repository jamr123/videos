'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./rutas/rutas')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('./scr/public'))

app.use(function (req, res, next) {
    
   
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use("/api_v_01", api)

module.exports = app