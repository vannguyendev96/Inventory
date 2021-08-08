const initialState = {
    isLogin: false,
    token: null,
    roll: '',
    kholamviec: '',
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            
            return {
                isLogin: true,
                token: action.payload.token,
                roll: action.payload.roll,
                kholamviec: action.payload.kholamviec,
                error: null,
            };
        case 'LOGIN_ERROR': {
            return {
                loading: false,
                token: 'error',
                roll: '',
                kholamviec: '',
                error: action.payload,
            };
        }

        default:
            return state;
    }
}

export default loginReducer;

