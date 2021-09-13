
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/user');

router.get('/signup',function(req,res){
    return res.render('signup', {
        title: 'User|SignUp'
    });
});

router.get('/signin', function(req,res){
    return res.render('signin',{
        title: 'User|SignIn'
    });
});

router.post('/create', userController.create);

router.post('/createSession', userController.createSession);

router.get('/profile', userController.profile);

module.exports = router;