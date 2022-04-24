const path = require('path');

const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const userRoutes = require('./routes/user');
const sequelize = require('./util/database');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user',userRoutes);


sequelize
    .sync()
    .then(()=>{
        app.listen(8000);
    console.log('hello,my');
    })
    .catch(err=>{
        console.log(err);
    })