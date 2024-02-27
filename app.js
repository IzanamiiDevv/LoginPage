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
function login(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

    fs.readFile(path.join(publicPath, 'data.json'), 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(fileData);

        const isLogged = object.some(userData => {
            return userData.name === toHash(data.name) && userData.password === toHash(data.password);
        });

        if (isLogged) {
            callback();
        } else {
            console.log('Login failed');
        }
    });
}


app.post('/LogIn',(req,res)=>{
    const data = req.body.message;
    login(data, () => {
        res.send(`You Are Now Logged In`);
    });
});

function signUp(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

    fs.readFile(path.join(publicPath, 'data.json'), 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(fileData);
        const isExistingUser = object.some(userData => {
            return userData.name === toHash(data.name);
        });

        if (isExistingUser) {
            console.log('Username already exists. Please choose a different one.');
        } else {
            object.push({
                name: toHash(data.name),
                password: toHash(data.password),
            });
            fs.writeFile(path.join(publicPath, 'data.json'), JSON.stringify(object, null, 2), 'utf-8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                } else {
                    console.log('User successfully registered');
                    callback();
                }
            });
        }
    });
}

app.post('/SignIn',(req,res)=>{
    const data = req.body.message;
    signUp(data, () => {
        res.send(`You Are Now Signed In`);
    });
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});