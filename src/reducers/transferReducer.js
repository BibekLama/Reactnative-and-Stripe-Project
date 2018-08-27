import {
    GET_TRANSFERS_REQUEST,
    GET_TRANSFERS_SUCCESS,
    GET_TRANSFERS_FAILURE,

    DO_TRANSFER_REQUEST,
    DO_TRANSFER_SUCCESS,
    DO_TRANSFER_FAILURE
} from '../constants/actionTypes';

const initialState = {
    inProgress : false,
    transfers : [],
    isError: false,
    error: []
}

const TransferReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSFERS_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case GET_TRANSFERS_SUCCESS:
            return {
                ...state,
                inProgress: false,
                isError: false,
                transfers: action.payload.data
            }
        case GET_TRANSFERS_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload
            }

        case DO_TRANSFER_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case DO_TRANSFER_SUCCESS:
            return {
                ...state,
                inProgress: false,
                isError: false,
                transfer: action.payload
            }
        case DO_TRANSFER_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export default TransferReducer;