import changeStateReducer from './changeState';
import loginReducer from './login';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    changeState: changeStateReducer,
    login: loginReducer
})

export default rootReducer;