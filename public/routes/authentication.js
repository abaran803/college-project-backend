// All the authentication logic here
const express = require('express');
const { addAccount, findAccount } = require('../controllers/data');
const router = express.Router();

router.post('/register', addAccount)

router.post('/login', findAccount)

module.exports = router;