const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
let name;
let email;
var error = [];

app.use(cookieParser());

app.use(express.static(__dirname + '/views'));
app.use(session({
    secret : 'secret'
}))
app.set("view engine","ejs");

app.get('/', (req,res) =>{
    res.render('index',{'name': name, 'email': email,'err': ""});
    // res.redirect('/')
})

app.post('/add', (req,res) =>{
    if (!req.body.name && !req.body.email) {
        var err1 = "Name is required";
        var err2 = "Email is required";
        // store in an array so that we can render in the index.ejs
        error.push(err1);
        error.push(err2);
        res.render('index', {'name': name, 'email': email, 'err': error})
        //after rendering we need to clear the array!
        error = [];
    }
    else if(!req.body.name){
        var err1 = "Name is required";
        // store in an array so that we can render in the index.ejs
        error.push(err1);
        res.render('index', {'name': name, 'email': email, 'err': error})
        //after rendering we need to clear the array!
        error = []
    }
    else if(!req.body.email){
        var err1 = "Email is required";
        error.push(err1);
        res.render('index', {'name': name, 'email': email, 'err': error})
        //after rendering we need to clear the array!
        error = []
    }
    else{
        req.session.name = req.body.name;
        req.session.email = req.body.email;
        // store data to render the names
        let name ="Your name is: " + req.session.name;
        let email ="Your email id is: " + req.session.email;
        //render those data at the index.ejs
        res.render('index', {'name': name, 'email': email, 'err': error})
        //after rendering we need to clear the array!
        error = []
        
    }
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))