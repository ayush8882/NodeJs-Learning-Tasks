const express = require('express');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const popup = require('node-popup');
const Todo = require('./model/model');
const alert=require('alert');
const app = express();
// Mongoose connection  --->.. ....
url = "mongodb+srv://ayush799:ayush@cluster0.lhatwoz.mongodb.net/UserInfo?retryWrites=true&w=majority"; 
var PORT = process.env.PORT || 3000;

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
    const todo = await Todo.find()
    res.render('index', {todo: todo})
})

app.post('/add', async (req,res) => {
    const task = req.body.todo;
    if(task.trim().length===0){
        res.redirect('/')
        alert("You can't Work on an Empty Job")
        // popup.alert("Hello Todo")
        return
    }
    const {status} = Todo;
        const newTodo = new Todo({task,status});
        newTodo.save().then(() =>{
            res.redirect('/');
        })
        .catch((err) => {console.log(err);})
   
    

})

app.get('/del/:id', async (req,res) =>{
    let id = req.params.id;
    let val = await Todo.remove({_id:id})
    .then((data) =>{
        res.redirect('/')
    })

})
// app.get('/edit/:id', async (req,res) =>{
//     let id = req.params.id;
//     //finds the id of the row that needs to be updated.
//     let val = await User.findOne({_id:id})
//     // renders to update.ejs page where we will update the data.
//     res.render('update',{cc:val});
// })

app.get('/complete/:id', async (req,res) => {
    const filter = {_id: req.params.id};
    const update = {status: true};
    let val= await Todo.findOneAndUpdate(filter, update, {new: true})
    .then((data) => {
        res.redirect('/');
    })
});
app.get('/ucomplete/:id', async (req,res) => {
    const filter = {_id: req.params.id};
    const update = {status: false};
    let val= await Todo.findOneAndUpdate(filter, update, {new: true})
    .then((data) => {
        res.redirect('/');
    })
});

app.get('/all', async (req,res) =>{
    const val = await Todo.find();
    res.render("index", {todo:val});
})
app.get('/active', async (req,res) =>{
    const val = await Todo.find({status: false});
    res.render("index", {todo:val});
})
app.get('/completed', async (req,res) =>{
    const val = await Todo.find({status: true});
    res.render("index", {todo:val});
})
app.listen(PORT);