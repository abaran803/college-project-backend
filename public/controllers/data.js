const {
    Account,
    LeaderBoard, 
    Quiz, 
    CodeData
} = require('../models/db')
require('dotenv').config();

const password = process.env.password;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Used to check password by matching with hashed password
const findByCredentials = async (username, password) => {
    const user = await Account.findOne({ $or: [{ name: username }, { email: username }] });
    if (!user) {
        throw new Error('Unable to login | User Not Found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login | Password Not Matched')
    }
    return user
}
// Checking if the user is authenticated
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, password)
        const user = await Account.findOne({
            _id: decoded._id, 'tokens.token':
                token
        })
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
// Generating and Saving Token on login
const generateAuthToken = async function (user) {
    const token = jwt.sign({ _id: user._id.toString() }, password)
    user.tokens = user.tokens.concat({ token })
    const changedUser = new Account(user);
    changedUser.save();
    return token
}
// Adding Data ----------------------------------------
const addAccount = async (req, res) => {

    try {
        let pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
        if(!pattern.test(req.body.password)) {
            throw new Error("Weak Password");
        }
        req.body.password = await bcrypt.hash(req.body.password, 8)
        const newAccount = new Account(req.body);
        const response = await newAccount.save();

        if (!response) {
            throw new Error("user is not registered");
        }

        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

// Method for login
const findAccount = async (req, res) => {

    try {
        const user = req.body;
        const response = await Account.findOne({ email: user.email });
        // Matching password
        const isAuth = await findByCredentials(req.body.email, req.body.password);
        const token = await generateAuthToken(response);
        if (!response || !isAuth || !token) {
            throw new Error("Not Found");
        }
        response.tokens = undefined;
        response.password = undefined;
        res.status(200).json({ ...response, token });
    } catch (e) {
        res.status(404).json({ Error: e.message });
    }
}


const getCodes = async (req, res) => {
    try {
        const language = req.params.language;
        const algorithmName = req.params.algorithmName;
        const response = await CodeData.find({ language, algorithmName });
        if (!response) {
            throw new Error("No Error found");
        }
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

const getLeaderBoard = async (req, res) => {
    try {
        const perPage = req.params.perPage
        const page = req.params.page
        // const response = await LeaderBoard.find({ name: req.body.name, perPage, page }).skip(perPage * page).limit(perPage).sort({ "score": 1 });
        const response = await LeaderBoard.find().sort({ "score": -1 });
        if (!response) {
            throw new Error("No Error found");
        }
        res.status(200).json(response);
    }
    catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

const getQuiz = async (req, res) => {
    try {
        const algorithmName = req.params.algorithmName;
        console.log(algorithmName);
        const response = await Quiz.find({ algoName: algorithmName });
        console.log(response);
        if (!response) {
            throw new Error("No Error found");
        }
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

const getQuizzes = async (req, res) => {
    try {
        const response = await Quiz.findAll();
        if (!response) {
            throw new Error("No Error found");
        }
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

const getAlgorithms = async (req, res) => {
    try {
        const response = await CodeData.find();
        if (!response) {
            throw new Error("No Error found");
        }
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json({ Error: e.message })
    }
}

module.exports = {
    addAccount,
    findAccount,
    getCodes,
    getLeaderBoard,
    getQuiz,
    getQuizzes,
    getAlgorithms
}
