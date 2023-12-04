import { createStore, combineReducers, compose,applyMiddleware } from 'redux';
import projectors from './reducers/projectorsReducer';
import professors from './reducers/professorsReducer';
import devices from './reducers/deviceReducer';
import Thunk from 'redux-thunk'
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const middlewares = [Thunk]
const composeEnhancers =   (process.env.EXPO_PUBLIC_MODE !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducer = combineReducers({professors,projectors,devices});
export default createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));
