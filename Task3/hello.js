const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res) =>{
    res.end("Hello World!")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))