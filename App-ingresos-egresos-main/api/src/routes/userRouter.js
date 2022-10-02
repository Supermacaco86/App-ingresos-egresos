const axios = require ('axios')
const {getAllUser, getUserById, getUserByName, postUser, putUser,deleteUser, restoreUser} = require('../controllers/User')

const express = require('express')
const router= express.Router();
// const {Staffs} = require ('../db')

router.get('/', getAllUser)
router.get('/search/', getUserByName)
router.post('/', postUser)
router.put('/edit/:id',putUser)
router.delete('/delete/:id',deleteUser)
router.get('/restore/:id', restoreUser)
router.get('/:id',getUserById )


module.exports=router;