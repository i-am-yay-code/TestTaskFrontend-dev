import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { usersSlice } from './usersSlice'
import { registrationSlice } from './registrationSlice';

export default configureStore({
    reducer: {
        users: usersSlice,
        registration: registrationSlice
    },
    middleware: [thunk, logger]
})