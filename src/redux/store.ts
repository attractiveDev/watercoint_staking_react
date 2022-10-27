import { applyMiddleware, compose, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"

import menuListReducer from './reducer/menuListReducer';

const rootReducer = combineReducers({
  menu: menuListReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
