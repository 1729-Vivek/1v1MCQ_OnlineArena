const express =require('express')
const {createMCQ,getMCQs,updateMCQ,deleteMCQ}=require('../controllers/mcqController')
const auth=require('../middlewares/auth')
const router=express.Router();

router.post('/',auth,createMCQ);
router.get('/',getMCQs);
router.put('/:id',auth,updateMCQ);
router.delete('/:id',auth,deleteMCQ)

module.exports=router