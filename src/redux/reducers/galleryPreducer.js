import {CREATE_PHOTO, DELETE_PHOTO, EDIT_PHOTO, GET_PHOTOS} from "../types";
import {arrayWithDelete, arrayWithFilter} from "./someFunctions";

const initialState = {
    photos: [],
}

export const galleryReducer = (state = initialState, action) =>{
    switch (action.type) {
        case EDIT_PHOTO:
            return {
                ...state,
                photos: arrayWithFilter(state.photos, action)
            }
        case DELETE_PHOTO:
            return {...state, photos: arrayWithDelete(state.photos, action)}
        case GET_PHOTOS:
            return {...state, photos: action.payload}
        case CREATE_PHOTO:
            return state
        default:
            return state
    }
}