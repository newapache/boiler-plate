const mongoose = require('mongoose');


// 스키마 -> 모델로 감싸줌 
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


// 스키마로 모듈 생성 
const User = mongoose.model('User', userSchema)
// 생성한 모듈을 다른 파일에서도 사용하기 위해 
module.exports = { User }

