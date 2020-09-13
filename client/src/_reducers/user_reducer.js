import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) { //이전 state과 action으로 바뀔 (next) state를 만든다  state={} 현재 상태는 비어있음 
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // nextstate
            break;
        // case REGISTER_USER:
        //     return { ...state, register: action.payload }
        //     break;
        // case AUTH_USER:
        //     return { ...state, userData: action.payload }
        //     break;
        default:
            return state;
    }
}