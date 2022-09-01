import * as ActionTypes from './actions'


export const fetchUsers = (page, count) => (dispatch) => {

    dispatch(usersLoading());

    return fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(users => {
            setTimeout(() => {
                dispatch(addUsers(users))
            }, 1200);
        })
        .catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});



export const postRegistration = (data, token) => (dispatch) => {

    dispatch(registrationStarted());

    //From ABZ
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
        {
            method: 'POST',
            body: data,
            headers: { 'Token': token },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.success) {
                dispatch(registrationDone());
            }
            else {
                dispatch(registrationError("Server error: " + data.message))
                alert("Server error: " + data.message);
            }
        })
        .catch(function (error) {
            dispatch(registrationError(error))
            alert("Network error:" + error);
        });


}

export const registrationStarted = () => ({
    type: ActionTypes.REGISTATION_LOADING
});

export const registrationDone = () => ({
    type: ActionTypes.REGISTRATION_DONE
})

export const registrationError = (error) => ({
    type: ActionTypes.REGISTRATION_ERROR,
    payload: error
})

export const fetchToken = () => (dispatch) => {

    dispatch(LoadingToken());
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log("Token fetched correctly: " + data);
            console.log(data);
            let { token } = data;
            console.log(token);
            dispatch(addToken(token));
        })
        .catch(function (error) {
            console.log("Error while fetching token: " + error);
            dispatch(errorToken(error));
        })
}

export const LoadingToken = () => ({
    type: ActionTypes.LOADING_TOKEN
});

export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const errorToken = (error) => ({
    type: ActionTypes.ERROR_TOKEN,
    payload: error
})