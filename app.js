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
function login({ name, password },callback) {
    fs.readFile(path.join(publicPath,'data.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(data);

        const isLogged = object.map(data => {
            return data.name == name && data.password == password;
        });

        
        if(isLogged.some(elem => elem == true)){
            callback()
        }
    });
}

login({ name: 'Kyle103', password: '09876543211' },()=>{
    console.log('You are Now Logged in')
})

app.post('/LogIn',(req,res)=>{
    const data = req.body.message;
    res.send(login(data)  ? `You Are Now Logged In`:`Error Has Occured Cant Logged In`);
});

function signin({ name, password}){
    return false
}

app.post('/SignIn',(req,res)=>{
    const data = req.body.message;
    res.send(signin(data)  ? `You Are Now Signed In`:`Error Has Occured Cant Logged In`);
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});