const axios = require ('axios')
const {getAllAccount}= require('../controllers/Account')

const express = require('express')
const router =express.Router();

const {Account} = require ('../db')

router.get('/', getAllAccount)

module.exports= router;
