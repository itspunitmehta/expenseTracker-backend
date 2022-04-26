const express = require('express');

const purchaseController = require('../controller/purchase');

const userAuth= require('../middleware/auth');


const router = express.Router();

router.get('/premiummembership', userAuth.userAuthenticate, purchaseController.purchasepremium);

router.post('/updatetransactionstatus', userAuth.userAuthenticate, purchaseController.updateTransactionStatus)


module.exports = router;