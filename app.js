const path = require('path');

const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
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
    })
    .catch(err=>{
        console.log(err);
    })