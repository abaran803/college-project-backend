const express = require('express');
const userRouter = require('./routes/user');
const auth = require('./routes/authentication');
const { auth: checkAuth } = require('./controllers/data');

const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

require('./config/dataConfig');

const PORT = 4000;

app.use('/user', auth, userRouter);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.json({ status: "API is working properly" });
})

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
})