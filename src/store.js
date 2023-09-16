import {combineReducers,applyMiddleware} from 'redux'
import { legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { getalleventreducer } from './Reducers/eventsreducer'
import { addnewparticipantreducer } from './Reducers/eventsreducer'
import { loginreducer } from './Reducers/loginreducer'





const rootReducer = combineReducers({
getalleventreducer:getalleventreducer,
addnewparticipantreducer:addnewparticipantreducer,
loginreducer:loginreducer

     
});
const initialState = {}
const middleware = [thunk] // wr are taking thunk as middleware so wr can use more than one middleware

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )   
export default store;


  