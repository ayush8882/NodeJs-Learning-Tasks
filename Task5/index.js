const express = require('express');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');

const User = require('./model/model');
const PORT = process.env.PORT || 5000;
const app = express();
// Mongoose connection  --->.. ....
url = "mongodb+srv://ayush799:ayush@cluster0.lhatwoz.mongodb.net/UserInfo?retryWrites=true&w=majority"; 
let msg;
mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected!"))
.catch((err)=> console.log(err))

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));



app.get('/', (req,res) =>{
    res.render('index',{'msg':msg});
})

app.post('/add', (req,res) =>{
    const name = req.body.uname;
    const email = req.body.uemail;
    const contact = req.body.ucontact;
    const address = req.body.uaddress;

    const newUser = new User({name, email, contact, address});

    newUser.save().then(() =>{
        console.log("Data Added");
        msg = "Data added in the database!"
        res.render('index',{'msg':msg});
    })
    .catch((err) => {console.log(err);})
})

app.listen(PORT);