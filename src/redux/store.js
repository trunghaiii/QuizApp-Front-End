import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const reducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;

// export const store = configureStore({
//     reducer: {
//         user: userReducer
//     }
// })
