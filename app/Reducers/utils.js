import { utils } from '../Actions/Types'
import { id } from '../Actions/utilsActions'

const initialState = {
    errorId: '',
    errorMessage: '',
    messageId: '',
    messageMessage: '',
}

const errorReducer = (state = initialState, action) => {
    if (action.error && action.error.response && action.error.response.data.message) {
        return {
            ...state,
            errorId: id(),
            errorMessage: action.error.response.data.message,
        }
    }

    switch (action.type) {
        case utils.MESSAGE:
            return {
                ...state,
                messageId: id(),
                messageMessage: action.message,
            }

        case utils.ERROR:
            return {
                ...state,
                errorId: id(),
                errorMessage: action.message,
            }

        default:
            return state
    }
}

export default errorReducer
