const express = require('express');
const path = require('path');
const crpyto = require('crypto');
const cors = require('cors');

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


app.post('/LogIn',(req,res)=>{
    const message = req.body.message;
    res.send(`You are now Loggedin ${message.name}`)
});

app.post('/SignIn',(req,res)=>{
    const message = req.body.message;
    res.send(`You are now Signedin ${message.name}`)
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});