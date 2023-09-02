const express = require('express');
const router = express.Router();
const arr=[];
router.get('/', (req, res) =>{
    res.render('index' ,{'arr': arr});
})
router.post('/', (req,res)=>{
    var name = req.body.name; 
    console.log(arr)
    arr.push(name)
    res.redirect('/')
    

})



module.exports = router;