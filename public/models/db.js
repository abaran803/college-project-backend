
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// All the schemas/structures here
const account = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password: {
        type: String,
        required: true
    },

    // Token of all the logged in session
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const codeData=new mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    algorithmName:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})
const leaderBoard= new mongoose.Schema({
    rank: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quizCount:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        require:true
    }
})


const quiz= new mongoose.Schema({
    algoName:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    correctAns:{
        type:Number,
        required:true
    }

})

const Account = new mongoose.model('Account', account);
const CodeData= new mongoose.model('CodeData', codeData);
const LeaderBoard=new mongoose.model('LeaderBoard', leaderBoard)
const Quiz = new mongoose.model('Quiz',quiz);

module.exports = {
    Account,
    CodeData,
    LeaderBoard,
    Quiz
}