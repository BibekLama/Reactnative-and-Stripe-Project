import {
    CHECKUSER_REQUEST,
    CHECKUSER_SUCCESS,
    CHECKUSER_FAILURE,
    INSERTUSER_REQUEST,
    INSERTUSER_SUCCESS,
    INSERTUSER_FAILURE,
    CREATEACC_REQUEST,
    CREATEACC_SUCCESS,
    CREATEACC_FAILURE,
    GETACC_REQUEST,
    GETACC_SUCCESS,
    GETACC_FAILURE,
    GET_ACCOUNTS_REQUEST,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAILURE,
    GET_RECEIVER_REQUEST,
    GET_RECEIVER_SUCCESS,
    GET_RECEIVER_FAILURE
} from '../constants/actionTypes'

import {getUsers, insertAccount} from '../database/schemas'

import realm from '../database/schemas'

import SECRET_KEY from '../constants/keys'


// CHECK ACCOUNTS
export const checkUserRequest = () => ({
    type: CHECKUSER_REQUEST,
})

export const checkUserSuccess = json => ({
    type: CHECKUSER_SUCCESS,
    payload: json
})

export const checkUserFailure = error => ({
    type: CHECKUSER_FAILURE,
    payload: error
})

export const checkUser = () => {
    // alert("getUser");
    return dispatch => {
        dispatch(checkUserRequest())
        return getUsers().then((users) => {
            dispatch(checkUserSuccess(users))
        }).catch((error) => {
            dispatch(checkUserFailure(error))
        })
    }
}

//INSERT ACCOUNT
export const insertUserRequest = () => ({
    type: INSERTUSER_REQUEST,
})

export const insertUserSuccess = json => ({
    type: INSERTUSER_SUCCESS,
    payload: json
})

export const insertUserFailure = error => ({
    type: INSERTUSER_FAILURE,
    payload: error
})

export const insertUser = (data) => {
    // alert(JSON.stringify(data));
    return dispatch => {
        dispatch(insertUserRequest())
        return insertAccount(data).then((users) => {
            dispatch(insertUserSuccess(users))
        }).catch((error) => {
            dispatch(insertUserFailure(error))
        })
    }
}

// CREATE ACCOUNT
export const createAccountRequest = () => ({
    type: CREATEACC_REQUEST,
})

export const createAccountSuccess = json => ({
    type: CREATEACC_SUCCESS,
    payload: json
})

export const createAccountFailure = error => ({
    type: CREATEACC_FAILURE,
    payload: error
})

export const createAccount = (data) => {
    // alert("createAccount");
    return dispatch => {
        dispatch(createAccountRequest())
        
        return fetch('https://api.stripe.com/v1/accounts?type=custom&country='+data.country+'&email='+data.email,{
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+SECRET_KEY
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(createAccountFailure(json.error))
            }else{
                dispatch(createAccountSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(createAccountFailure(error))
        })
    }
}

// GET ACCOUNT DETAIL
export const getAccountRequest = () => ({
    type: GETACC_REQUEST,
})

export const getAccountSuccess = json => ({
    type: GETACC_SUCCESS,
    payload: json
})

export const getAccountFailure = error => ({
    type: GETACC_FAILURE,
    payload: error
})

export const getAccount = (data) => {
    // alert("getAccount");
    return dispatch => {
        dispatch(getAccountRequest())
        
        return fetch('https://api.stripe.com/v1/accounts/'+data.id,{
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+data.sk
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(getAccountFailure(json.error))
            }else{
                dispatch(getAccountSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(getAccountFailure(error))
        })
    }
}

// GET ACCOUNTS LIST
export const getAccountsRequest = () => ({
    type: GET_ACCOUNTS_REQUEST,
})

export const getAccountsSuccess = json => ({
    type: GET_ACCOUNTS_SUCCESS,
    payload: json
})

export const getAccountsFailure = error => ({
    type: GET_ACCOUNTS_FAILURE,
    payload: error
})

export const getAccounts = () => {
    return dispatch => {
        dispatch(getAccountsRequest())
        return fetch('https://api.stripe.com/v1/accounts',{
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+SECRET_KEY
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(getAccountsFailure(json.error))
            }else{
                dispatch(getAccountsSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(getAccountsFailure(error))
        })
    }
}

// GET RECEIVER DETAIL
export const getReceiverRequest = () => ({
    type: GET_RECEIVER_REQUEST,
})

export const getReceiverSuccess = json => ({
    type: GET_RECEIVER_SUCCESS,
    payload: json
})

export const getReceiverFailure = error => ({
    type: GET_RECEIVER_FAILURE,
    payload: error
})

export const getReceiver = (id) => {
    return dispatch => {
        dispatch(getReceiverRequest())
        return fetch('https://api.stripe.com/v1/accounts/'+id,{
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+SECRET_KEY
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(getReceiverFailure(json.error))
            }else{
                dispatch(getReceiverSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(getReceiverFailure(error))
        })
    }
}