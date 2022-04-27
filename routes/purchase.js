const express = require('express');

const purchaseController = require('../controller/purchase');

const userAuth= require('../middleware/auth');


const router = express.Router();

router.get('/premiummembership', userAuth.userAuthenticate, purchaseController.purchasepremium);

router.post('/updatetransactionstatus', userAuth.userAuthenticate, purchaseController.updateTransactionStatus)

router.get('/premium/leaderboard', userAuth.userAuthenticate, purchaseController.getAllUSer)


module.exports = router;