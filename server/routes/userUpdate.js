const express=require('express')
const router=express()

const updateController=require('../controllers/updateController')

router.put('/update',updateController)

module.exports=router