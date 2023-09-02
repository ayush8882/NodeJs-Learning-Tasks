const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const userRouter = require('./routes/todo');
// const arr=[];


app.use(bodyParser.urlencoded({ extended: true }))


app.use('/',userRouter);

app.set("view engine", 'ejs');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))