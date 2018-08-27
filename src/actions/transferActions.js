import {
    GET_TRANSFERS_REQUEST,
    GET_TRANSFERS_SUCCESS,
    GET_TRANSFERS_FAILURE,

    DO_TRANSFER_REQUEST,
    DO_TRANSFER_SUCCESS,
    DO_TRANSFER_FAILURE
} from '../constants/actionTypes';

import SECRET_KEY from '../constants/keys'

// GET TRANSFERS LIST
export const getTransfersRequest = () => ({
    type: GET_TRANSFERS_REQUEST,
})

export const getTransfersSuccess = json => ({
    type: GET_TRANSFERS_SUCCESS,
    payload: json
})

export const getTransfersFailure = error => ({
    type: GET_TRANSFERS_FAILURE,
    payload: error
})

export const getTransfers = (sk) => {
    return dispatch => {
        dispatch(getTransfersRequest())
        return fetch('https://api.stripe.com/v1/transfers',{
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+sk
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(getTransfersFailure(json.error))
            }else{
                dispatch(getTransfersSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(getTransfersFailure(error))
        })
    }
}

// DO TRANSFER TO ACCOUNT
export const doTransferRequest = () => ({
    type: DO_TRANSFER_REQUEST,
})

export const gdoTransferSuccess = json => ({
    type: DO_TRANSFER_SUCCESS,
    payload: json
})

export const doTransferFailure = error => ({
    type: DO_TRANSFER_FAILURE,
    payload: error
})

export const doTransfer = (data) => {
    return dispatch => {
        dispatch(getTransfersRequest())
        return fetch('https://api.stripe.com/v1/transfers?amount='+data.amount+'&currency=usd&destination='+data.receiverID,{
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+SECRET_KEY
            }
        })
        .then(res => res.json())
        .then((json) => {
            if(json.error){
                dispatch(getTransfersFailure(json.error))
            }else{
                dispatch(getTransfersSuccess(json))
            }  
        })
        .catch((error) => {
            dispatch(getTransfersFailure(error))
        })
    }
}