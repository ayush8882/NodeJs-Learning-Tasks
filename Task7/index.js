const express = require('express');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const PORT=process.env.PORT||3000;
const User = require('./model/model');

const app = express();
// Mongoose connection  --->.. ....
url = "mongodb+srv://ayush799:ayush@cluster0.lhatwoz.mongodb.net/Task7?retryWrites=true&w=majority"; 

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
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;
    console.log(email);

    const newUser = new User({name, email, contact, address});
    newUser.save().then(() =>{
        console.log("Data Added");
        res.redirect('/');
    })
    .catch((err) => {console.log(err);})
})

app.get('/del/:id', async (req,res) =>{
    let id = req.params.id;
    let val = await User.remove({_id:id})
    .then((data) =>{
       // res.json(data);
       res.redirect('/');
    });
    
})
app.get('/edit/:id', async (req,res) =>{
    let id = req.params.id;
    //finds the id of the row that needs to be updated.
    let val = await User.findOne({_id:id})
    // renders to update.ejs page where we will update the data.
    res.render('update',{cc:val});
})

app.post('/update/:id', async (req,res) => {
    const filter = {_id: req.params.id};
    const update = {name: req.body.name, email:req.body.email, contact:req.body.contact, address:req.body.address};
    let val= await new Promise((res,rej)=>{
        res( User.findOneAndUpdate(filter, update, {new: true}))
    });
    res.redirect('/')
});

app.listen(PORT);