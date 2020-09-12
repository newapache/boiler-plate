const express = require('express')
const app = express()
const port = 5000
const mongooese = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth1 } = require('./middleware/auth');
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www-form-urlencoded 형태 데이터를 파싱하여 가져옴 
app.use(bodyParser.urlencoded({ extended: true }));
 
//application/json 형태 데이터를 파싱하여 가져옴 
app.use(bodyParser.json());
app.use(cookieParser());

mongooese.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~ '))


app.post('/api/users/register', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 (바디파서로 파싱을 해서 가능해짐) 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body) //model에서 export 

    //bcrypt 관련 작업은 저장 전 수행 
    user.save((err, userInfo) => { // save : mongodb method 
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
    })
  })


app.post('/api/users/login', (req, res) => {
      // req에서 로긴 정보 받기
      // db에서 검색 
      // 로긴 이후 전환 할 페이지 return ?
      User.findOne({ email: req.body.email }, (err, user) => { //mongo func
        if (!user) { //user는 document 타입 
          return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당하는 유저가 없습니다."
          })
        }

        //else req.body.password <-> user.password 
        //사용자 정의 func 
        user.comparePassword(req.body.password, (err, isMatch) => {  //cb func
          // console.log('err',err)
    
          // console.log('isMatch',isMatch)
          if (!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
    
          //비밀번호 까지 맞다면 토큰을 생성하기.
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            // 토큰을 저장한다.  어디에 ?  쿠키 , 로컬스토리지.. 어디가 안전한지에 대한 의견은 분분하다. 
            res.cookie("x_auth", user.token) // 개발자도구에 찍힐 토큰 이름 
              .status(200)
              .json({ loginSuccess: true, userId: user._id })
          })
        })
      })
})

app.get('/api/users/auth', auth1, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말. next로 넘어옴 
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email, //auth에서 req에 user정보를 담았기 때문에 사용 가능 
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth1, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})






