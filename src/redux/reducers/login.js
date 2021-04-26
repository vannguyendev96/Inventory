const initialState = {
    isLogin: false,
    token: null,
    roll: '',
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            
            return {
                isLogin: true,
                token: action.payload.token,
                roll: action.payload.roll,
                error: null,
            };
        case 'LOGIN_ERROR': {
            return {
                loading: false,
                token: 'error',
                roll: '',
                error: action.payload,
            };
        }

        default:
            return state;
    }
}

export default loginReducer;

