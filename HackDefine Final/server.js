const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
var bodyParser = require('body-parser');

let username = 'Sign In';
let balance = 500;
let array = ['rice', 38, 'wheat', 30, 'daal', 60];

app.set('view engine', 'ejs');
app.use(bodyParser.json());

var db = mongoose.connection;

const db_link = 'mongodb+srv://Harsh:3syUpEFsaX9Meiwm@cluster0.0dnxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log(db);
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    });

// Schema for mongoDB
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        minLength: 8
    },
});

const PaymentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    address: {
        type: String,
        require: true,
        minLength: 8
    },
    city: {
        type: String,
        require: true,
    },
    credit: {
        type: String,
        require: true,
    },
    expireData: {
        type: String,
        require: true,
    },
    zip: {
        type: String,
        require: true,
    },
    amount: {
        type: String,
        require: true,
    }
});

const ContactSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
});

const DonatebyFoodSchema = mongoose.Schema({



    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    daysold: {
        type: String,
        require: true
    }
});

const OrganisationDonateSchema = mongoose.Schema({



    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    meals: {
        type: String,
        require: true
    }
});


// Model
const userModel = mongoose.model('signup', UserSchema);
const paymentModel = mongoose.model('payment', PaymentSchema);
const ContactModel = mongoose.model('Contact-Msg', ContactSchema);
const DonatebyFodModel = mongoose.model('Donated-Food', DonatebyFoodSchema);
const OrganisationModel = mongoose.model('Organisation', OrganisationDonateSchema);
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));








// Routes

app.get('/', (req, res) => {
    let name = 'Harsh';
    // // res.sendFile(__dirname+'/index.html');

    // details.find({},function(err,detail){
    //     res.render('index.ejs',{
    //         detailsList:detail,
    //         userName:name
    //     });
    // })

    res.sendFile(__dirname + '/public/index.html');

});

app.get('/sign', (req, res) => {
    res.sendFile(__dirname + '/public/signUpIn/index.html')
});

app.get('/donate', (req, res) => {
    res.sendFile(__dirname + '/public/Donate-by-Money/index.html')
});

app.get('/byfood', (req, res) => {
    res.sendFile(__dirname + '/public/donation-food/byFood.html');
});

app.get('/Contact-Us', (req, res) => {
    res.sendFile(__dirname + '/public/Contact-Us/contact.html');
});

app.get('/organisation', (req, res) => {
    res.sendFile(__dirname + '/public/organisation/index.html');
})

app.get('/thank', (req, res) => {
    res.sendFile(__dirname + '/public/thankyou/index.html');
})


app.post('/sign', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    // var phone =req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        // "phone":phone
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        else {
            userModel.create(data);
            console.log(data);
            console.log("Record inserted Successfully");
        }
    });
    // return res.redirect('https://www.youtube.com/watch?v=uPFsZLfJ6p0&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=12&t=740s ');

    username = req.body.name;
    // username="abc";
    return res.render('index.ejs', {
        username: username
    })
});

app.post('/payment', function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var city = req.body.city;
    var credit = req.body.credit;
    var expireData = req.body.expireData;
    var zip = req.body.zip;
    var amount = req.body.amount;
    balance = parseInt(amount);
    console.log(balance);

    var data = {
        "name": name,
        "email": email,
        "address": address,
        "city": city,
        "credit": credit,
        "expireData": expireData,
        "zip": zip,
        "amount": amount
    }

    db.collection('/payments').insertOne(data, function (err, collection) {
        if (err) throw err;
        else {
            paymentModel.create(data);
            console.log(data);
            console.log("Record inserted Successfully");
        }
    });
    // return res.redirect('https://www.youtube.com/watch?v=uPFsZLfJ6p0&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=12&t=740s ');

    res.render('resource.ejs', {
        balance: balance,
        array: array
    })
});


app.post('/contact-us', (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message
    }

    db.collection('contact-Msg').insertOne(data, function (err, collection) {
        if (err) throw err;
        else {
            ContactModel.create(data);
            console.log(data);
            console.log("Record inserted Successfully");
        }
    });
    res.sendFile(__dirname + '/public/thankyou/index.html');
    // return res.redirect('https://www.youtube.com/watch?v=uPFsZLfJ6p0&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=12&t=740s ');
});

app.post('/organisation', (req, res) => {
    console.log(req.body);
    var org = req.body.org;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var meals = req.body.demand;

    var data = {
        "organisation": org,
        "name": name,
        "email": email,
        "phone": phone,
        "message": meals
    }

    db.collection('Organisation').insertOne(data, function (err, collection) {
        if (err) throw err;
        else {
            OrganisationModel.create(data);
            console.log(data);
            console.log("Record inserted Successfully");
        }
    });
    // return res.redirect('https://www.youtube.com/watch?v=uPFsZLfJ6p0&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=12&t=740s ');
    //  return sendFile("__dirname+'/public/resources/resources.html'");
    return res.render('resource.ejs', {
        array: array,
        balance: balance
    });
});


app.post('/byfood', (req, res) => {
    console.log(req.body);
    var food = req.body.food;
    var donor = req.body.donor;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var daysold = req.body.daysold;
    var quantity = req.body.txt;
    for (let i = 0; i < quantity.length; i++) {
        array.push(quantity[i]);
    }

    var data = {
        "food": food,
        "donor": donor,
        "name": name,
        "email": email,
        "phone": phone,
        "daysold": daysold,
        "quantity": quantity
    }



    db.collection('DonatebyFood').insertOne(data, function (err, collection) {
        if (err) throw err;
        else {
            DonatebyFodModel.create(data);
            console.log(data);
            console.log("Record inserted Successfully");
        }
    });

    // return res.redirect('https://www.youtube.com/watch?v=uPFsZLfJ6p0&list=PL-Jc9J83PIiEnK1q9tuVrrORqKBexcE_J&index=12&t=740s ');
    return res.render('resource.ejs', {
        array: array,
        balance: balance
    })
})


// Static Files
app.use(express.static('public'));

app.listen(3000);