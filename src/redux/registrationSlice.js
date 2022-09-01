import * as ActionTypes from "./actions";

const InitialState = {
    isLoading: true,
    errMess: null,
    success: false,
    token: null,
    isTokenLoading: false,
    tokenErrMess: null
}

export const registrationSlice = (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTATION_LOADING:
            return { ...state, isLoading: true, errMess: null, success: false };

        case ActionTypes.REGISTRATION_DONE:
            return { ...state, isLoading: false, errMess: null, success: true };

        case ActionTypes.REGISTRATION_ERROR:
            return { ...state, isLoading: false, errMess: action.payload, success: false };

        case ActionTypes.LOADING_TOKEN:
            return { ...state, isTokenLoading: true, tokenErrMess: null};

        case ActionTypes.ADD_TOKEN:
            return { ...state, token: action.payload, isTokenLoading: false, tokenErrMess: null };

        case ActionTypes.ERROR_TOKEN:
            return { ...state, isTokenLoading: false, tokenErrMess: action.payload};


        default:
            return state;
    }
};
