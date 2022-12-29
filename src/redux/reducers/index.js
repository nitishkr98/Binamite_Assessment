import { combineReducers } from 'redux';
import USER_REDUCER from './user';

const appReducer = combineReducers({
  users: USER_REDUCER,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
