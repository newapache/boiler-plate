const express = require('express')
const app = express()
const port = 5000
const mongooese = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require("./models/User");
const config = require("./config/key");

//application/x-www-form-urlencoded 형태 데이터를 파싱하여 가져옴 
app.use(bodyParser.urlencoded({ extended: true }));
 
//application/json 형태 데이터를 파싱하여 가져옴 
app.use(bodyParser.json());

mongooese.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!~~ '))

app.post('/register', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 (바디파서로 파싱을 해서 가능해짐) 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body) //model에서 export 

    user.save((err, userInfo) => { // save : mongodb method 
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
    })
  })

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})



