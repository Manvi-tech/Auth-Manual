
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
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('err in finding user while signing user!');
            return res.redirect('back');
        }
        if(!user){
            return res.redirect('/user/signup');
        }
        else{
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        }
    })
}

module.exports.profile= function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('error in finding user while rendering profile');
                return res.redirect('/user/signin');
            }
            if(user){
                return res.render('profile',{
                    title: 'User|Profile',
                    user: user
                });
            }else{
                return res.redirect('/user/signin');
            }
        })
    }else{
        return res.redirect('/user/signin')
    }
}