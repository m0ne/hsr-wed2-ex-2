const express = require('express');
const router = express.Router();
const randomController = require('../controllers/randomController');

router.get('/',  randomController.index);
router.get('/random', randomController.renderRandomResult);
router.post('/random', randomController.redirectToRandomResult);

module.exports = router;
