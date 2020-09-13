import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';


function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("") // "" 빈 문자열로 초기화 
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 의도하지 않은 refresh를 막아줌 
        console.log('Email', Email);

        let body = {
            email: Email,
            password: Password
        }

        // (redux를 쓰지 않았다면  여기서 axios로 post로 처리 )
        // redux (1) dispatch로 action (loginUser) 처리 (_actions/user_action.js 작성 )
        // redux (2) action수행 결과를 reducer로 보내기 
        dispatch(loginUser(body))
         .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert('Error˝')
            }
        })

    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
