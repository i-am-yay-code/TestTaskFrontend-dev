import * as ActionTypes from './actions'


const InitialState = {
    isLoading: true,
    errMess: null,
    usersList: [],
    nextLink: null
}

export const usersSlice = (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return { ...state, isLoading: false, errMess: null, usersList: state.usersList.concat(action.payload.users), nextLink: action.payload.links.next_url };

        case ActionTypes.USERS_LOADING:
            return { ...state, isLoading: true, errMess: null, usersList: state.usersList }

        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: true, errMess: action.payload };

        default:
            return state;
    }
};


