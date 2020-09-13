import axios from 'axios';
import {
    LOGIN_USER, //export const LOGIN_USER = "login_user";
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) { //dispatch가 수행할 액션 

    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data) //서버에서 받은 데이터를 request에 저장 

    return { // 받은 데이터를 reducer로 보내기 
        type: LOGIN_USER, //"login_user"
        payload: request
    }
}


export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}