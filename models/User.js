const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //비밀번호 암호화에 사용됨 

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

userSchema.pre('save', function (next) { //몽고디비 method 
    var user = this;
    if (user.isModified('password')) {
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) { //saltRounds를 이용해 salt 생성 -> 암호화에 사용 
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next() //pre작업이 끝나면 save 실행 
    }
})

//2.모듈 생성 
const User = mongoose.model('User', userSchema)

//3.생성한 모듈 export 
module.exports = { User }


