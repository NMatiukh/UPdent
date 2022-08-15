import {
    CHANGE_PRICE_LIST_TITLE,
    CREATE_PRICE_LIST,
    DELETE_PRICE_LIST,
    EDIT_PRICE_LIST,
    GET_PRICE_LIST,
    SET_PRICE_LIST
} from "../types";
import {arrayWithDelete, arrayWithFilter, arrayWithFilterFromTitle} from "./someFunctions";

const initialState = {
    priceList: [],
}

export const priceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICE_LIST:
            return {...state, priceList: action.payload}
        case CREATE_PRICE_LIST:
            return {
                ...state,
                priceList: arrayWithFilterFromTitle(state.priceList, action)
            }
        case EDIT_PRICE_LIST:
            return {
                ...state,
                priceList: arrayWithFilter(state.priceList, action)
            }
        case DELETE_PRICE_LIST:
            return {...state, priceList: arrayWithDelete(state.priceList, action)}
        case SET_PRICE_LIST:
            return {...state, priceList: [...state.priceList, action.payload]}
        case CHANGE_PRICE_LIST_TITLE:
            return {
                ...state,
                priceList: arrayWithFilter(state.priceList, action)
            }
        default:
            return state
    }
}