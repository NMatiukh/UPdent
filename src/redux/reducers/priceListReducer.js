import {
    CHANGE_PRICE_LIST_TITLE, CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD, GET_FIELDS, GET_GROUPS,
    GET_PRICE_LIST,
    SET_PRICE_LIST
} from "../types";
import {arrayWithDelete, arrayWithFilter} from "./someFunctions";

const initialState = {
    priceList: [],
    groups: [],
    fields: []
}

export const priceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICE_LIST:
            return {...state, priceList: state.groups}
        case GET_GROUPS:
            return {...state, groups: action.payload}
        case GET_FIELDS:
            return {...state, fields: action.payload}
        case DELETE_GROUP:
            return {...state, priceList: arrayWithDelete(state.priceList, action)}
        case DELETE_FIELD:
            return {
                ...state,
                priceList: state.priceList.map(value => value.id === action.payload.groupID ? {
                    ...value,
                    details: value.details.filter(value1 => value1.id !== action.payload.id)
                } : value)
            }
        case CREATE_GROUP:
            return {
                ...state,
                priceList: [...state.priceList, action.payload]
            }
        case CREATE_FIELD:
            return {
                ...state,
                priceList: state.priceList.map(value => value.id === action.payload.groupID ? {
                    ...value,
                    details: [...value.details, action.payload]
                } : value)
            }
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