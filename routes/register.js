const express = require('express');
const router = express.Router();

const newUser = require('../controllers/registerController');

router.post('/', newUser);

module.exports = router;