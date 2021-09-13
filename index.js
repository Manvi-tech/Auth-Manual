
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:false}));
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: "Manvi",
//         phone: "4545564549"
//     },
//     {
//         name: "Michele",
//         phone: "46545564540"
//     }
// ]

app.get('/',function(req,res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('err in finding contacts!');
            return;
        }else{
            return res.render('home',{
                title: "Contacts List",
                contact_list: contacts
            });
        }
    })

});

app.post('/create-contact', function(req,res){
    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        birthday: req.body.birthday
    }, function(err, newContact){
            if(err){
                console.log('err in creating contact!'); return;
            }
            else{
                console.log("Contact created :", newContact);
                return res.redirect('back');
            }
       });
   });

app.get('/delete-contact/:phone', function(req, res){
    let Id = req.params.phone;
    Contact.findByIdAndDelete(Id, function(err){
        if(err){
            console.log('err in deleting contact');
            return;
        }else{
            return res.redirect('back');
        }
    });

})

app.listen(port, function(err){
    if(err)console.log(err);
    console.log('server is running on :', port);
});