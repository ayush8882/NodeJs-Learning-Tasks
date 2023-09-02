// Creating and writing to the file directly

const http = require('http');
const path = require('path');
const fs = require('fs');
textContent = "I am glad to welcome you on my website devoted to traveling. My name is Uliana, I am 30 years old and as you may guess I am fond of exploring this big and incredible world. I was born in Kiev, Ukraine and I am living and working there between my travels. I am sorry for my English which is far away from perfect, but I hope it will not disturb you much and you will find my articles and stories interesting and informative."
fs.writeFile(path.join(__dirname, 'MyBlog.txt'), textContent , (err) =>{
    if(err) throw err;
})

fs.readFile(path.join(__dirname,'./MyBlog.txt'), 'utf8', (err, data) =>{
    if(err) throw err;
    console.log(data);

})