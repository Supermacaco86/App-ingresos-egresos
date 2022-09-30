const axios = require ('axios')
const {getAllStaff, getStaffById, getStaffByName, postStaff, putStaff,deleteStaff, restoreStaff} = require('../controllers/staff')

const express = require('express')
const router= express.Router();
// const {Staffs} = require ('../db')

router.get('/', getAllStaff)
router.get('/search/', getStaffByName)
router.post('/', postStaff)
router.put('/edit/:id',putStaff)
router.delete('/delete/:id',deleteStaff)
router.get('/restore/:id', restoreStaff)
router.get('/:id',getStaffById )


module.exports=router;