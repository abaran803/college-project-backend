// Configuring the Database here
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
    .then(() => console.log('database connected'))
    .catch((error) => console.log('error', error.message))