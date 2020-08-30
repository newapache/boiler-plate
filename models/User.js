const mongoose = require('mongoose');

//1.스키마 생성 
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true, //스페이스 제거 
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {    //admin 고려 
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})
//2.모듈 생성 
const User = mongoose.model('User', userSchema)
//3.생성한 모듈 export 
module.exports = { User }

