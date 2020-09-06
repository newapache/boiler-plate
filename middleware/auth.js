const { User } = require('../models/User');

let auth1 = (req, res, next) => {
    //인증 처리를 하는곳 
    //클라이언트 쿠키에서 토큰을 가져온다.

    let token = req.cookies.x_auth;
    // 토큰을 복호화 한후  유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })


        // console.log('userh', user)

        req.token = token; // 넣어야 get cb에서 유저 정보를 활용 가능 
        req.user = user;
        next(); // next가 없으면 이 부분 수행 후 미들웨어에 갇힘. index.js의 get cb를 이어 수행하려면 호출 
    })
}


module.exports = { auth1 };