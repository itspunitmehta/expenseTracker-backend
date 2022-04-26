const path = require('path');

const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(cors());

const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');

const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user',userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
    .sync()
    // .sync({force:true})
    .then(()=>{
        app.listen(8000);
    })
    .catch(err=>{
        console.log(err);
    })