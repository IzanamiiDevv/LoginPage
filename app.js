const express = require('express');
const path = require('path');
const crpyto = require('crypto');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname,'public')

app.use(express.static(publicPath));

//middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/',(req,res)=>{
    //Entry Point
    res.sendFile(path.join(publicPath,'page.signin.html'));
});

//Server Op
function login(data){

}

app.post('/LogIn',(req,res)=>{
    const data = req.body.message;
    login(data)
    res.send(`You are now Loggedin ${data.name}`)
});

function signin(data){

}

app.post('/SignIn',(req,res)=>{
    const data = req.body.message;
    signin(data)
    res.send(`You are now Signedin ${data.name}`)
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});