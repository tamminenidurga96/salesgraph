const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

router.get('/barchart', exampleController.getBarChartData);
router.get('/statistics', exampleController.getStatistics);
router.get('/transactions', exampleController.getTransactions);

module.exports = router;
