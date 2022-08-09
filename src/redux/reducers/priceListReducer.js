import {GET_PRICE_LIST} from "../types";

const initialState = {
    priceList: []
}

export const priceListReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRICE_LIST:
            return {...state, priceList: action.payload}
        default:
            return state
    }
}