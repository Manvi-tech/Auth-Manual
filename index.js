
const express = require('express');
const path = require('path');
const port = 8000;
const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:false}));
app.use(express.static('assets'));
//app.use('/css', express.static(path.join(__dirname + '/adssets/css')));

var contactList = [
    {
        name: "Manvi",
        phone: "4545564549"
    },
    {
        name: "Michele",
        phone: "46545564540"
    }
]

app.get('/',function(req,res){
    return res.render('home',{
        title: "Contacts List",
        contact_list: contactList
    });

});

app.post('/create-contact', function(req,res){
    contactList.push(req.body);
    return res.redirect('back');
});

app.get('/delete-contact/:phone', function(req, res){
    let phone = req.params.phone;
    let contactIndex = contactList.find(contact => contact.phone==phone);

    if(contactIndex !=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})

app.listen(port, function(err){
    if(err)console.log(err);
    console.log('server is running on :', port);
});