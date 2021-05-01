import { setCookie } from 'src/utlis/cookies';
import userAPI from '../../api/userlogin';


export const login = (user) => {
    return async dispatch => {
        await userAPI.login(user)
            .then(response => {
                setCookie('token', response.token, 1);
                dispatch(LOGIN_SUCCESS(response))
            })
            .catch(error => dispatch(LOGIN_ERROR(error)))
    }
}



const LOGIN_SUCCESS = (user) => {
    return{
        type: 'LOGIN_SUCCESS',
        payload: user
    }
}

const LOGIN_ERROR = (error) => {
    return{
        type: 'LOGIN_ERROR',
        payload: error
    }
}