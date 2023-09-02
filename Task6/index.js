const express = require('express');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const User = require('./model/model');

const app = express();
// Mongoose connection  --->.. ....
url = "mongodb+srv://ayush799:ayush@cluster0.lhatwoz.mongodb.net/UserInfo?retryWrites=true&w=majority"; 

mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected!"))
.catch((err)=> console.log(err))

app.use(express.static("public"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));



app.get('/', async function(req, res){
    const cc = await User.find()
    res.render('index', {cc: cc})
})

app.post('/add', async (req,res) => {
    const name = req.body.uname;
    const email = req.body.uemail;
    const contact = req.body.ucontact;
    const address = req.body.uaddress;

    const newUser = new User({name, email, contact, address});

    newUser.save().then(() =>{
        console.log("Data Added");
        res.redirect('/');
    })
    .catch((err) => {console.log(err);})
})

app.listen(PORT);