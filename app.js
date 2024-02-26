const express = require('express');
const path = require('path');
const crpto = require('crypto');
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
    res.sendFile(path.join(publicPath,'index.html'));
});

//Server Op

app.post('/LogIn',(req,res)=>{
    const message = req.body.message;
    res.send(`I got Your Request ${message.name}`)
})


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});