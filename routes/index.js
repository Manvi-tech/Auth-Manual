
const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
   
    return res.render('home', {
        title: 'Home Page'
    });
 });

router.use('/user', require('./user'));

module.exports = router;