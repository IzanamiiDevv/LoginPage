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

login({ name: 'Kyle103', password: '09876543211' }, () => {
    console.log('You are now logged in');
});

app.post('/LogIn',(req,res)=>{
    const data = req.body.message;
    res.send(login(data)  ? `You Are Now Logged In`:`Error Has Occured Cant Logged In`);
});

function signUp(data, callback) {
    function toHash(inc) {
        const hash = crypto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

    fs.readFile(path.join(publicPath, 'data.json'), 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(fileData);

        // Check if the username already exists
        const isExistingUser = object.some(userData => {
            return userData.name === toHash(data.name);
        });

        if (isExistingUser) {
            console.log('Username already exists. Please choose a different one.');
        } else {
            // Add the new user to the array
            object.push({
                name: toHash(data.name),
                password: toHash(data.password),
            });

            // Write the updated data back to the file
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

signUp({ name: 'NewUser', password: 'newpassword' }, () => {
    console.log('Registration successful');
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