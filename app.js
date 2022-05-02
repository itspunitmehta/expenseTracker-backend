const path = require('path');
const fs = require('fs');
const https = require('https')

const express = require('express');
var cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet');

// const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(cors());

const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPassword = require('./models/password');

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase')
const passwordRoutes = require('./routes/password')

const morganLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});


// app.use(bodyParser.urlencoded()); // this is handling forms data action data,,,,
// app.use(bodyParser.json()); // this is used for json
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet());
app.use(morgan('combined', {stream:morganLogStream}));

app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/password', passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

sequelize
    .sync()
    // .sync({force:true})
    .then(()=>{
    //    https.createServer({key:privateKey, cert:certificate}, app)
    //    .listen(process.env.PORT || 8000);
       app.listen(process.env.PORT || 8000);
    })
    .catch(err=>{
        console.log(err);
    })