
const User = require('../models/user');

module.exports.create = function(req,res){
     
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('err in finding user while signing up!');
            return;
        }
        if(!user){
            User.create(req.body, function(err, newUser){
                if(err){
                    console.log('err in finding user while signing up!');return;
                }
                else{
                    return res.redirect('/user/signin');
                }
            })
        }else{
            console.log('user with this emailId exists already!!');
             return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    
}