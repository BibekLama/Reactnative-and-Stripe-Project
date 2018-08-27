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

const initialState = {
    inProgress : false,
    users : [],
    user:{},
    isError: false,
    error: [],
    account: {},
    accounts:[],
    receiver:{}
}

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKUSER_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case CHECKUSER_SUCCESS:
            return {
                ...state,
                inProgress: false,
                users: action.payload,
                isError: false
            }
        case CHECKUSER_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }
        case INSERTUSER_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case INSERTUSER_SUCCESS:
            return {
                ...state,
                inProgress: false,
                users: action.payload,
                isError: false
            }
        case INSERTUSER_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }
        case CREATEACC_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case CREATEACC_SUCCESS:
            return {
                ...state,
                inProgress: false,
                account: action.payload,
                isError: false
            }
        case CREATEACC_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }
        case GETACC_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case GETACC_SUCCESS:
            return {
                ...state,
                inProgress: false,
                account: action.payload,
                isError: false
            }
        case GETACC_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }

        case GET_ACCOUNTS_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case GET_ACCOUNTS_SUCCESS:
            return {
                ...state,
                inProgress: false,
                accounts: action.payload.data,
                isError: false
            }
        case GET_ACCOUNTS_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }

        case GET_RECEIVER_REQUEST:
            return {
                ...state,
                inProgress: true,
                isError: false
            }
        case GET_RECEIVER_SUCCESS:
            return {
                ...state,
                inProgress: false,
                receiver: action.payload,
                isError: false
            }
        case GET_RECEIVER_FAILURE:
            return {
                ...state,
                inProgress: false,
                isError: true,
                error: action.payload,
            }
        default:
            return state;
    }
}
export default AccountReducer;