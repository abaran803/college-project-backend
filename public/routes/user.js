
// All the user actions like update, delete etc here
const { request } = require('express');
const express = require('express');
const { get } = require('mongoose');
const userRouter = express.Router();
const {
    getCodes, getLeaderBoard, getQuizzes, getAlgorithms
} = require('../controllers/data');

// Adding Data to Database

// Getting Data from Database
userRouter.get('/getCodes/:language/:algorithmName', getCodes)
userRouter.get('/getLeaderBoard/:perPage/:page', getLeaderBoard)
userRouter.get('/getQuizzess', getQuizzes)
userRouter.get('/getAlgorithms', getAlgorithms)

// Deleting Data from Database

// Updating Data in Database

module.exports = userRouter;