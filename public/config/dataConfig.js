// Configuring the Database here
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect(process.env.mongodb_uri)
    .then(() => console.log('database connected'))
    .catch((error) => console.log('error', error.message))