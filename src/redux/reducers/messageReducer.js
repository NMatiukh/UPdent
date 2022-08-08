import {DELETE_MESSAGE, EDIT_MESSAGE, GET_MESSAGES} from "../types";
import {arrayWithDelete} from "./someFunctions";

const initialState = {
    messages: [],
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_MESSAGE:
            return state
        case DELETE_MESSAGE:
            return {...state, messages: arrayWithDelete(state.messages, action)}
        case GET_MESSAGES:
            return {...state, messages: action.payload}
        default:
            return state
    }
}