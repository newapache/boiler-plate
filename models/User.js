const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //비밀번호 암호화에 사용됨 
const jwt = require('jsonwebtoken'); //import 

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
    if (user.isModified('password')) { //저장 전인데 비밀번호 변경 시 
                //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) { //saltRounds를 이용해 salt 생성 -> 암호화에 사용 
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { // 비밀번호 외 수정 시 
        next() //pre작업이 끝나면 save 실행 
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 1234567    암호회된 비밀번호 (DB) $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}


userSchema.methods.generateToken = function (cb) {
    var user = this;
    // console.log('user._id', user._id)

    // jsonwebtoken을 이용해서 token을 생성하기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 
    // -> 
    // 'secretToken' -> user._id

    user.token = token //생성된 토큰 저장 
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user) //생성 잘 되었으면 유저 정보만 전달 
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}


//2.모델 생성 
const User = mongoose.model('User', userSchema)

//3.생성한 모델 export 
module.exports = { User }


