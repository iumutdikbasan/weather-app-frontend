import {configureStore} from '@reduxjs/toolkit';
import logReducer from './logSlice';
import storage from 'redux-persist/lib/storage'
import {  persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';




const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    
}

const reducer = combineReducers({
    log: logReducer,
})



const persistedReducer = persistReducer(persistConfig, reducer)




export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: false

});



export default store;