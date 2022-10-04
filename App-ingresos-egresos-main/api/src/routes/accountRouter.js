const axios = require ('axios')
const {getAllAccount, getAccountById}= require('../controllers/Account')

const express = require('express')
const router =express.Router();

const {Account} = require ('../db')

router.get('/', getAllAccount)
router.get('/:id', getAccountById )

module.exports= router;
