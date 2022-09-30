const axios = require ('axios')
const {getInfoApiAccont}= require('../controllers/Account')

const express = require('express')
const router =express.Router();

const {Account} = require ('../db')

router.get('/', getInfoApiAccont)

module.exports= router;
