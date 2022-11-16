import {
    CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD, EDIT_GROUP, GET_FIELDS, GET_GROUPS, GET_PRICE_DATA,
    GET_PRICE_LIST, PRICE_DATA, SET_PRICE_DETAILS, SET_PRICE_LIST
} from "../types";
import {arrayWithDelete} from "./someFunctions";

const initialState = {
    priceList: [],
    groups: [],
    fields: [],
    priceData: {}
}

export const priceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICE_LIST:
            return {...state, priceList: action.payload}
        case SET_PRICE_DETAILS:
            return {
                ...state,
                priceList: state.priceList.map(value => value.id === action.payload[0].sectionId ? {
                    ...value,
                    details: action.payload
                } : value)
            }
        case SET_PRICE_LIST:
            return {...state, priceList: action.payload}
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
        case EDIT_FIELD:
            return {
                ...state,
                priceList: state.priceList.map(value => value.id === action.payload.groupID ? {
                    ...value,
                    details: value.details.map(detail => detail.id === action.payload.id ? action.payload : detail)
                } : {...value, details: value.details.filter(value1 => value1.id !== action.payload.id)})
            }
        case EDIT_GROUP:
            return {
                ...state,
                priceList: state.priceList.map(value => value.id === action.payload.id ? action.payload : value)
            }
        case PRICE_DATA:
            return {
                ...state,
                priceData: action.payload
            }
        case GET_PRICE_DATA:
            return {
                ...state,
                priceData: action.payload,
            }
        default:
            return state
    }
}